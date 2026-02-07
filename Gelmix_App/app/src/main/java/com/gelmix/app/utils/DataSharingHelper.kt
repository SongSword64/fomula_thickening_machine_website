package com.gelmix.app.utils

import android.content.Context
import com.gelmix.app.database.AppDatabase
import com.gelmix.app.models.FeedingRecord
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

/**
 * Helper class for data sharing functionality
 * Allows parents to voluntarily share feeding data with the company
 */
class DataSharingHelper(
    private val context: Context,
    private val database: AppDatabase
) {

    private val gson: Gson = GsonBuilder()
        .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        .create()

    /**
     * Export all feeding records to JSON format
     * This can be shared with the company or kept for personal records
     */
    suspend fun exportFeedingData(): String = withContext(Dispatchers.IO) {
        val feedingRecordDao = database.feedingRecordDao()
        
        // Get all feeding records (using a blocking call for export)
        // In production, you'd need to get LiveData and observe it
        // For now, this is a placeholder structure
        
        val exportData = mapOf(
            "exportDate" to Date(),
            "appVersion" to "1.0.0",
            "dataType" to "feeding_records",
            "records" to emptyList<FeedingRecord>() // Would contain actual records
        )
        
        gson.toJson(exportData)
    }

    /**
     * Save exported data to a file in the app's external files directory
     * @return File path where data was saved
     */
    suspend fun saveExportToFile(): String = withContext(Dispatchers.IO) {
        val data = exportFeedingData()
        val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
        val filename = "gelmix_feeding_data_$timestamp.json"
        
        val file = File(context.getExternalFilesDir(null), filename)
        file.writeText(data)
        
        file.absolutePath
    }

    /**
     * Generate a summary of feeding data for sharing
     * This includes aggregate statistics but removes personally identifiable information
     */
    suspend fun generateAnonymizedSummary(): Map<String, Any> = withContext(Dispatchers.IO) {
        val feedingRecordDao = database.feedingRecordDao()
        val thirtyDaysAgo = Calendar.getInstance().apply {
            add(Calendar.DAY_OF_YEAR, -30)
        }.time
        
        // These would be calculated from actual data
        mapOf(
            "summaryPeriod" to "last_30_days",
            "totalFeedings" to 0,
            "averageVolumeConsumed" to 0.0,
            "remakeRate" to 0.0,
            "spitUpRate" to 0.0,
            "mostCommonThickness" to 1,
            "averageFeedingsPerDay" to 0.0
        )
    }

    /**
     * Check if user has consented to data sharing
     */
    suspend fun hasDataShareConsent(): Boolean = withContext(Dispatchers.IO) {
        val preferences = database.userPreferencesDao().getPreferencesSync()
        preferences?.dataShareConsent ?: false
    }

    /**
     * Update user's data sharing consent
     */
    suspend fun updateDataShareConsent(consent: Boolean) = withContext(Dispatchers.IO) {
        val preferences = database.userPreferencesDao().getPreferencesSync()
        preferences?.let {
            val updated = it.copy(dataShareConsent = consent)
            database.userPreferencesDao().updatePreferences(updated)
        }
    }

    /**
     * Request deletion of shared data
     * In production, this would send a request to the company's server
     */
    suspend fun requestDataDeletion(): Boolean = withContext(Dispatchers.IO) {
        // In production, this would make an API call to request data deletion
        // For now, we just update the local consent to false
        updateDataShareConsent(false)
        true
    }

    /**
     * Share user story/feedback
     * @return Story ID or null if sharing failed
     */
    suspend fun shareStory(story: String, allowPublic: Boolean): String? = withContext(Dispatchers.IO) {
        // In production, this would send the story to a backend API
        // For now, we save it locally
        val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
        val storyId = "story_$timestamp"
        
        val storyData = mapOf(
            "id" to storyId,
            "timestamp" to Date(),
            "story" to story,
            "allowPublic" to allowPublic
        )
        
        val file = File(context.filesDir, "stories/$storyId.json")
        file.parentFile?.mkdirs()
        file.writeText(gson.toJson(storyData))
        
        storyId
    }
}
