package com.gelmix.app.notifications

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.gelmix.app.database.AppDatabase
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

/**
 * Receiver to reschedule notifications after device boot
 */
class BootReceiver : BroadcastReceiver() {

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            // Reschedule any pending notifications
            rescheduleNotifications(context)
        }
    }

    private fun rescheduleNotifications(context: Context) {
        scope.launch {
            val database = AppDatabase.getDatabase(context, scope)
            val preferencesDao = database.userPreferencesDao()
            val feedingRecordDao = database.feedingRecordDao()

            // Get user preferences to check if notifications are enabled
            val preferences = preferencesDao.getPreferencesSync()
            if (preferences?.enableNotifications == true) {
                // Reschedule feeding reminders for records without follow-ups
                // Note: In a real implementation, you would need to track scheduled notifications
                // and their trigger times to properly reschedule them
                
                // Reschedule purchase reminders based on consumption patterns
                // This would involve recalculating when supplies will run out
            }
        }
    }
}
