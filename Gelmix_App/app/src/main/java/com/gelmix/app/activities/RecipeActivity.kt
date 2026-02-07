package com.gelmix.app.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.gelmix.app.R
import com.gelmix.app.database.AppDatabase

/**
 * Recipe lookup activity
 * Allows users to select formula type, brand, and get thickening instructions
 */
class RecipeActivity : AppCompatActivity() {

    private lateinit var database: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_recipe)

        database = AppDatabase.getDatabase(this, lifecycleScope)

        setupUI()
        loadRecipes()
    }

    private fun setupUI() {
        // Setup toolbar
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = "Recipe Lookup"
        }

        // TODO: Initialize UI components
        // - Spinner for formula brand selection
        // - Spinner for formula type selection  
        // - Spinner for thickness level (IDDSI 1-3)
        // - Input for bottle volume
        // - Button to generate recipe
        // - TextView to display recipe instructions
        // - Button to save/start feeding with this recipe
    }

    private fun loadRecipes() {
        // Observe recipe database and populate UI
        database.recipeDao().getAllRecipes().observe(this) { recipes ->
            // Update UI with available recipes
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
