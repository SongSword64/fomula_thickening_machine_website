package com.gelmix.app.notifications

import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.gelmix.app.R
import com.gelmix.app.activities.FeedingLogActivity
import java.util.Calendar

/**
 * Receiver for feeding reminder notifications
 * Triggers 1 hour after a feeding to collect follow-up data
 */
class FeedingReminderReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val feedingRecordId = intent.getLongExtra(EXTRA_FEEDING_RECORD_ID, -1)
        val recipeName = intent.getStringExtra(EXTRA_RECIPE_NAME) ?: "Formula"

        if (feedingRecordId != -1L) {
            showFeedingFollowUpNotification(context, feedingRecordId, recipeName)
        }
    }

    private fun showFeedingFollowUpNotification(
        context: Context,
        feedingRecordId: Long,
        recipeName: String
    ) {
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        // Create notification channel for Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Feeding Reminders",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Follow-up reminders for feeding records"
            }
            notificationManager.createNotificationChannel(channel)
        }

        // Create intent to open FeedingLogActivity
        val intent = Intent(context, FeedingLogActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            putExtra(EXTRA_FEEDING_RECORD_ID, feedingRecordId)
            putExtra(EXTRA_IS_FOLLOW_UP, true)
        }

        val pendingIntent = PendingIntent.getActivity(
            context,
            feedingRecordId.toInt(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle("Feeding Follow-Up")
            .setContentText("How did the feeding go with $recipeName?")
            .setStyle(
                NotificationCompat.BigTextStyle()
                    .bigText("Please record: Did you need to remake the bottle? How much did your child consume? Did they spit up?")
            )
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()

        notificationManager.notify(feedingRecordId.toInt(), notification)
    }

    companion object {
        const val CHANNEL_ID = "feeding_reminders"
        const val EXTRA_FEEDING_RECORD_ID = "feeding_record_id"
        const val EXTRA_RECIPE_NAME = "recipe_name"
        const val EXTRA_IS_FOLLOW_UP = "is_follow_up"

        /**
         * Schedule a feeding reminder notification for 1 hour from now
         */
        fun scheduleFeedingReminder(
            context: Context,
            feedingRecordId: Long,
            recipeName: String
        ) {
            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val intent = Intent(context, FeedingReminderReceiver::class.java).apply {
                putExtra(EXTRA_FEEDING_RECORD_ID, feedingRecordId)
                putExtra(EXTRA_RECIPE_NAME, recipeName)
            }

            val pendingIntent = PendingIntent.getBroadcast(
                context,
                feedingRecordId.toInt(),
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            // Schedule for 1 hour from now
            val triggerTime = Calendar.getInstance().apply {
                add(Calendar.HOUR_OF_DAY, 1)
            }.timeInMillis

            // Use exact alarm for precise timing
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                alarmManager.setExactAndAllowWhileIdle(
                    AlarmManager.RTC_WAKEUP,
                    triggerTime,
                    pendingIntent
                )
            } else {
                alarmManager.setExact(
                    AlarmManager.RTC_WAKEUP,
                    triggerTime,
                    pendingIntent
                )
            }
        }

        /**
         * Cancel a scheduled feeding reminder
         */
        fun cancelFeedingReminder(context: Context, feedingRecordId: Long) {
            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val intent = Intent(context, FeedingReminderReceiver::class.java)
            val pendingIntent = PendingIntent.getBroadcast(
                context,
                feedingRecordId.toInt(),
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            alarmManager.cancel(pendingIntent)
        }
    }
}
