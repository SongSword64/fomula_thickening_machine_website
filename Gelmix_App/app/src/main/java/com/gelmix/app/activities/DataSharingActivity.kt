package com.gelmix.app.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.gelmix.app.R
import com.gelmix.app.database.AppDatabase
import com.gelmix.app.utils.DataSharingHelper
import kotlinx.coroutines.launch

/**
 * Data sharing activity
 * Allows users to manage data sharing consent and share stories
 */
class DataSharingActivity : AppCompatActivity() {

    private lateinit var database: AppDatabase
    private lateinit var dataSharingHelper: DataSharingHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_data_sharing)

        database = AppDatabase.getDatabase(this, lifecycleScope)
        dataSharingHelper = DataSharingHelper(this, database)

        setupUI()
        loadConsentStatus()
    }

    private fun setupUI() {
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = "Data Sharing"
        }

        // TODO: Initialize UI components
        // - Explanation of data collection
        // - Switch for data sharing consent
        // - Privacy policy link
        // - Button to export personal data
        // - Button to request data deletion
        // - Section to share story/feedback
        // - EditText for story
        // - Checkbox for making story public
        // - Submit story button
    }

    private fun loadConsentStatus() {
        lifecycleScope.launch {
            val hasConsent = dataSharingHelper.hasDataShareConsent()
            // Update UI with consent status
        }
    }

    private fun updateConsent(consent: Boolean) {
        lifecycleScope.launch {
            dataSharingHelper.updateDataShareConsent(consent)
            
            if (consent) {
                showMessage("Thank you for helping us improve!")
            } else {
                showMessage("Data sharing disabled")
            }
        }
    }

    private fun exportData() {
        lifecycleScope.launch {
            try {
                val filePath = dataSharingHelper.saveExportToFile()
                showMessage("Data exported to: $filePath")
            } catch (e: Exception) {
                showMessage("Failed to export data: ${e.message}")
            }
        }
    }

    private fun requestDeletion() {
        androidx.appcompat.app.AlertDialog.Builder(this)
            .setTitle("Request Data Deletion")
            .setMessage("Are you sure you want to request deletion of your shared data? This cannot be undone.")
            .setPositiveButton("Yes, Delete") { _, _ ->
                lifecycleScope.launch {
                    val success = dataSharingHelper.requestDataDeletion()
                    if (success) {
                        showMessage("Deletion request submitted")
                    } else {
                        showMessage("Failed to submit deletion request")
                    }
                }
            }
            .setNegativeButton("Cancel", null)
            .show()
    }

    private fun submitStory(story: String, allowPublic: Boolean) {
        if (story.isBlank()) {
            showMessage("Please enter your story")
            return
        }

        lifecycleScope.launch {
            val storyId = dataSharingHelper.shareStory(story, allowPublic)
            if (storyId != null) {
                showMessage("Thank you for sharing your story!")
                // Clear the story input
            } else {
                showMessage("Failed to submit story")
            }
        }
    }

    private fun showMessage(message: String) {
        android.widget.Toast.makeText(this, message, android.widget.Toast.LENGTH_SHORT).show()
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
