package com.gelmix.app.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.gelmix.app.R
import com.gelmix.app.database.AppDatabase
import kotlinx.coroutines.launch

/**
 * Settings activity
 * Allows users to configure app preferences
 */
class SettingsActivity : AppCompatActivity() {

    private lateinit var database: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        database = AppDatabase.getDatabase(this, lifecycleScope)

        setupUI()
        loadPreferences()
    }

    private fun setupUI() {
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = "Settings"
        }

        // TODO: Initialize UI components
        // - Switch for enabling notifications
        // - Switch for feeding reminders
        // - Switch for purchase reminders
        // - Number picker for purchase reminder buffer (2-5 days)
        // - Button to open data sharing settings
        // - Display current app version
        // - Button to check for updates
        // - About section with privacy policy
    }

    private fun loadPreferences() {
        database.userPreferencesDao().getPreferences().observe(this) { preferences ->
            preferences?.let {
                // Update UI with current preferences
                updateUIWithPreferences(it)
            }
        }
    }

    private fun updateUIWithPreferences(preferences: com.gelmix.app.models.UserPreferences) {
        // Set switch states and other UI elements based on preferences
    }

    private fun savePreferences() {
        lifecycleScope.launch {
            // Collect values from UI and save to database
            val currentPrefs = database.userPreferencesDao().getPreferencesSync()
            currentPrefs?.let {
                // Update with UI values
                database.userPreferencesDao().updatePreferences(it)
            }
        }
    }

    override fun onPause() {
        super.onPause()
        savePreferences()
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
