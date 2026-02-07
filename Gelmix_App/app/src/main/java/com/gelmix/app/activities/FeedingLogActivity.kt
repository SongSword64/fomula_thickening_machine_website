package com.gelmix.app.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.gelmix.app.R
import com.gelmix.app.database.AppDatabase
import com.gelmix.app.notifications.FeedingReminderReceiver
import kotlinx.coroutines.launch
import java.util.Date

/**
 * Feeding log activity
 * Displays history of feedings and allows recording follow-up information
 */
class FeedingLogActivity : AppCompatActivity() {

    private lateinit var database: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_feeding_log)

        database = AppDatabase.getDatabase(this, lifecycleScope)

        setupUI()
        
        // Check if we're opening for a follow-up
        val isFollowUp = intent.getBooleanExtra(FeedingReminderReceiver.EXTRA_IS_FOLLOW_UP, false)
        val recordId = intent.getLongExtra(FeedingReminderReceiver.EXTRA_FEEDING_RECORD_ID, -1)
        
        if (isFollowUp && recordId != -1L) {
            showFollowUpDialog(recordId)
        }
        
        loadFeedingHistory()
    }

    private fun setupUI() {
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = "Feeding Log"
        }

        // TODO: Initialize UI components
        // - RecyclerView for feeding history
        // - Each item shows: timestamp, recipe, volume consumed, notes
        // - Filter options: date range, recipe type
        // - Export button to save data
        // - Statistics summary: total feedings, average consumption, etc.
    }

    private fun loadFeedingHistory() {
        database.feedingRecordDao().getAllFeedingRecords().observe(this) { records ->
            // Update RecyclerView with feeding history
            // Show most recent first
        }
    }

    private fun showFollowUpDialog(recordId: Long) {
        // Show dialog to collect follow-up information
        // - Was the bottle remade? Why?
        // - How much did the child consume?
        // - Did they spit up?
        // - Any additional notes?
        
        lifecycleScope.launch {
            // Get the record and show dialog
            // After collecting info, update the record
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
