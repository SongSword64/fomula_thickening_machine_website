package com.gelmix.app.utils

import android.content.Context
import com.gelmix.app.database.AppDatabase
import com.gelmix.app.models.ConsumptionTracking
import com.gelmix.app.notifications.PurchaseReminderReceiver
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch
import java.util.Calendar
import java.util.Date

/**
 * Helper class to track consumption and predict when to reorder supplies
 */
class ConsumptionPredictor(
    private val context: Context,
    private val database: AppDatabase,
    private val scope: CoroutineScope
) {

    companion object {
        // Average amounts per container (approximate values)
        const val GELMIX_PER_CONTAINER_GRAMS = 250.0
        const val FORMULA_PER_CONTAINER_OZ = 128.0 // Example: large can
        
        // Default daily usage rates (will be calculated from actual data)
        const val DEFAULT_DAILY_GELMIX_GRAMS = 10.0
        const val DEFAULT_DAILY_FORMULA_OZ = 24.0
    }

    /**
     * Calculate predicted days until running out of supplies
     * @return Pair of (gelmixDays, formulaDays)
     */
    suspend fun predictDaysUntilRunOut(): Pair<Int?, Int?> {
        val consumptionDao = database.consumptionTrackingDao()
        
        // Get latest inventory
        val latest = consumptionDao.getLatestConsumption()
        val gelmixRemaining = latest?.gelmixRemaining ?: return Pair(null, null)
        val formulaRemaining = latest?.formulaRemaining ?: return Pair(null, null)

        // Calculate average daily usage from last 7 days
        val sevenDaysAgo = Calendar.getInstance().apply {
            add(Calendar.DAY_OF_YEAR, -7)
        }.time

        val totalGelmix = consumptionDao.getTotalGelmixUsed(sevenDaysAgo) ?: 0.0
        val totalFormula = consumptionDao.getTotalFormulaUsed(sevenDaysAgo) ?: 0.0

        val avgDailyGelmix = if (totalGelmix > 0) totalGelmix / 7.0 else DEFAULT_DAILY_GELMIX_GRAMS
        val avgDailyFormula = if (totalFormula > 0) totalFormula / 7.0 else DEFAULT_DAILY_FORMULA_OZ

        // Calculate days remaining
        val gelmixDays = if (avgDailyGelmix > 0) (gelmixRemaining / avgDailyGelmix).toInt() else null
        val formulaDays = if (avgDailyFormula > 0) (formulaRemaining / avgDailyFormula).toInt() else null

        return Pair(gelmixDays, formulaDays)
    }

    /**
     * Check if a purchase reminder should be scheduled and schedule it
     * @param bufferDays Number of days before running out to notify (2-5 days)
     */
    fun checkAndSchedulePurchaseReminder(bufferDays: Int = 3) {
        scope.launch {
            val (gelmixDays, formulaDays) = predictDaysUntilRunOut()

            // Determine which product will run out first
            val minDays = listOfNotNull(gelmixDays, formulaDays).minOrNull()
            
            if (minDays != null && minDays <= bufferDays) {
                val productType = when {
                    gelmixDays == minDays && formulaDays == minDays -> "Gelmix and formula"
                    gelmixDays == minDays -> "Gelmix"
                    else -> "formula"
                }

                // Schedule notification for now (immediate) if already within buffer
                val daysUntilNotification = 0
                PurchaseReminderReceiver.schedulePurchaseReminder(
                    context,
                    productType,
                    daysUntilNotification,
                    minDays
                )
            } else if (minDays != null && minDays > bufferDays) {
                // Schedule for when we hit the buffer period
                val daysUntilNotification = minDays - bufferDays
                val productType = when {
                    gelmixDays == minDays && formulaDays == minDays -> "Gelmix and formula"
                    gelmixDays == minDays -> "Gelmix"
                    else -> "formula"
                }

                PurchaseReminderReceiver.schedulePurchaseReminder(
                    context,
                    productType,
                    daysUntilNotification,
                    bufferDays
                )
            }
        }
    }

    /**
     * Record consumption from a feeding
     */
    suspend fun recordConsumption(gelmixUsed: Double, formulaUsed: Double) {
        val consumptionDao = database.consumptionTrackingDao()
        
        // Get current inventory
        val latest = consumptionDao.getLatestConsumption()
        
        val record = ConsumptionTracking(
            gelmixUsed = gelmixUsed,
            formulaUsed = formulaUsed,
            date = Date(),
            gelmixRemaining = (latest?.gelmixRemaining ?: 0.0) - gelmixUsed,
            formulaRemaining = (latest?.formulaRemaining ?: 0.0) - formulaUsed
        )
        
        consumptionDao.insertConsumptionRecord(record)
    }

    /**
     * Update inventory levels (when user purchases new supplies)
     */
    suspend fun updateInventory(gelmixAdded: Double = 0.0, formulaAdded: Double = 0.0) {
        val consumptionDao = database.consumptionTrackingDao()
        val latest = consumptionDao.getLatestConsumption()
        
        val record = ConsumptionTracking(
            gelmixUsed = 0.0,
            formulaUsed = 0.0,
            date = Date(),
            gelmixRemaining = (latest?.gelmixRemaining ?: 0.0) + gelmixAdded,
            formulaRemaining = (latest?.formulaRemaining ?: 0.0) + formulaAdded
        )
        
        consumptionDao.insertConsumptionRecord(record)
    }
}
