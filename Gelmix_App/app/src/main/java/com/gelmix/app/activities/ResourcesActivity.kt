package com.gelmix.app.activities

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.gelmix.app.R
import com.gelmix.app.database.AppDatabase

/**
 * Resources activity
 * Displays educational videos and links for parents
 */
class ResourcesActivity : AppCompatActivity() {

    private lateinit var database: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_resources)

        database = AppDatabase.getDatabase(this, lifecycleScope)

        setupUI()
        loadResources()
    }

    private fun setupUI() {
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = "Resources"
        }

        // TODO: Initialize UI components
        // - RecyclerView for resources list
        // - Categories: IDDSI, Gelmix, General
        // - Each resource shows title, description, and action button
        // - Videos can be opened in YouTube app or browser
    }

    private fun loadResources() {
        database.resourceDao().getAllResources().observe(this) { resources ->
            // Update RecyclerView with resources
            // Group by category
        }
    }

    private fun openUrl(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        startActivity(intent)
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
