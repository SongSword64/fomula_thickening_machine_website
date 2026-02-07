package com.gelmix.app.activities

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.gelmix.app.R
import com.gelmix.app.database.AppDatabase
import com.gelmix.app.utils.UpdateChecker
import kotlinx.coroutines.launch

/**
 * Main entry point activity for the Gelmix App
 * Provides navigation to all major features
 */
class MainActivity : AppCompatActivity() {

    private lateinit var database: AppDatabase
    private lateinit var updateChecker: UpdateChecker

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize database
        database = AppDatabase.getDatabase(this, lifecycleScope)
        updateChecker = UpdateChecker(this)

        // Check for updates on app start
        checkForUpdates()

        setupNavigation()
    }

    private fun setupNavigation() {
        // Recipe Lookup button
        findViewById<android.view.View>(R.id.btn_recipe_lookup)?.setOnClickListener {
            startActivity(Intent(this, RecipeActivity::class.java))
        }

        // Resources button
        findViewById<android.view.View>(R.id.btn_resources)?.setOnClickListener {
            startActivity(Intent(this, ResourcesActivity::class.java))
        }

        // Purchase button
        findViewById<android.view.View>(R.id.btn_purchase)?.setOnClickListener {
            startActivity(Intent(this, PurchaseActivity::class.java))
        }

        // Feeding Log button
        findViewById<android.view.View>(R.id.btn_feeding_log)?.setOnClickListener {
            startActivity(Intent(this, FeedingLogActivity::class.java))
        }

        // Settings button
        findViewById<android.view.View>(R.id.btn_settings)?.setOnClickListener {
            startActivity(Intent(this, SettingsActivity::class.java))
        }
    }

    private fun checkForUpdates() {
        lifecycleScope.launch {
            try {
                val preferences = database.userPreferencesDao().getPreferencesSync()
                val lastCheck = preferences?.lastUpdateCheck?.time ?: 0L

                if (updateChecker.shouldCheckForUpdates(lastCheck)) {
                    val updateInfo = updateChecker.checkForUpdates()

                    if (updateInfo.isUpdateAvailable) {
                        showUpdateDialog(updateInfo)
                    }

                    // Update last check time
                    preferences?.let {
                        val updated = it.copy(lastUpdateCheck = java.util.Date())
                        database.userPreferencesDao().updatePreferences(updated)
                    }
                }
            } catch (e: Exception) {
                // Silently fail update check
            }
        }
    }

    private fun showUpdateDialog(updateInfo: UpdateChecker.UpdateInfo) {
        val message = buildString {
            append("A new version (${updateInfo.latestVersion}) is available!\n\n")
            updateInfo.releaseNotes?.let {
                append("What's new:\n$it")
            }
        }

        androidx.appcompat.app.AlertDialog.Builder(this)
            .setTitle(if (updateInfo.isRequired) "Update Required" else "Update Available")
            .setMessage(message)
            .setPositiveButton("Update") { _, _ ->
                updateChecker.openPlayStoreForUpdate()
            }
            .apply {
                if (!updateInfo.isRequired) {
                    setNegativeButton("Later", null)
                }
            }
            .setCancelable(!updateInfo.isRequired)
            .show()
    }
}
