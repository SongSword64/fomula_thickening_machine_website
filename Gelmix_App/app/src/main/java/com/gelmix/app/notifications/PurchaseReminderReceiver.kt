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
import com.gelmix.app.activities.PurchaseActivity
import java.util.Calendar

/**
 * Receiver for purchase reminder notifications
 * Reminds parents to purchase more Gelmix/formula based on consumption patterns
 */
class PurchaseReminderReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val productType = intent.getStringExtra(EXTRA_PRODUCT_TYPE) ?: "supplies"
        val daysRemaining = intent.getIntExtra(EXTRA_DAYS_REMAINING, 0)

        showPurchaseReminderNotification(context, productType, daysRemaining)
    }

    private fun showPurchaseReminderNotification(
        context: Context,
        productType: String,
        daysRemaining: Int
    ) {
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        // Create notification channel for Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Purchase Reminders",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Reminders to purchase more supplies"
            }
            notificationManager.createNotificationChannel(channel)
        }

        // Create intent to open PurchaseActivity
        val intent = Intent(context, PurchaseActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }

        val pendingIntent = PendingIntent.getActivity(
            context,
            NOTIFICATION_ID,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val title = "Time to Restock!"
        val message = if (daysRemaining > 0) {
            "You have approximately $daysRemaining days of $productType remaining. Consider ordering more soon."
        } else {
            "Your $productType may be running low. Consider ordering more to avoid running out."
        }

        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(message)
            .setStyle(NotificationCompat.BigTextStyle().bigText(message))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()

        notificationManager.notify(NOTIFICATION_ID, notification)
    }

    companion object {
        const val CHANNEL_ID = "purchase_reminders"
        const val NOTIFICATION_ID = 1001
        const val EXTRA_PRODUCT_TYPE = "product_type"
        const val EXTRA_DAYS_REMAINING = "days_remaining"

        /**
         * Schedule a purchase reminder notification
         * @param daysUntilNotification Days from now when the notification should appear
         * @param daysRemaining Estimated days of supply remaining
         */
        fun schedulePurchaseReminder(
            context: Context,
            productType: String,
            daysUntilNotification: Int,
            daysRemaining: Int
        ) {
            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val intent = Intent(context, PurchaseReminderReceiver::class.java).apply {
                putExtra(EXTRA_PRODUCT_TYPE, productType)
                putExtra(EXTRA_DAYS_REMAINING, daysRemaining)
            }

            val pendingIntent = PendingIntent.getBroadcast(
                context,
                NOTIFICATION_ID,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            // Schedule for specified days from now
            val triggerTime = Calendar.getInstance().apply {
                add(Calendar.DAY_OF_YEAR, daysUntilNotification)
                set(Calendar.HOUR_OF_DAY, 10) // 10 AM
                set(Calendar.MINUTE, 0)
                set(Calendar.SECOND, 0)
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
         * Cancel a scheduled purchase reminder
         */
        fun cancelPurchaseReminder(context: Context) {
            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val intent = Intent(context, PurchaseReminderReceiver::class.java)
            val pendingIntent = PendingIntent.getBroadcast(
                context,
                NOTIFICATION_ID,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            alarmManager.cancel(pendingIntent)
        }
    }
}
