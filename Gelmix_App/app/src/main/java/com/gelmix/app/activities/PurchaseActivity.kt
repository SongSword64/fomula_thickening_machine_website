package com.gelmix.app.activities

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.gelmix.app.R
import com.gelmix.app.database.AppDatabase
import com.gelmix.app.utils.ConsumptionPredictor

/**
 * Purchase activity
 * Displays affiliate links for purchasing Gelmix and formula
 * Shows inventory status and reorder reminders
 */
class PurchaseActivity : AppCompatActivity() {

    private lateinit var database: AppDatabase
    private lateinit var consumptionPredictor: ConsumptionPredictor

    companion object {
        // Affiliate links - replace with actual affiliate URLs
        private const val GELMIX_AFFILIATE_URL = "https://gelmix.com/?ref=gelmixapp"
        private const val FORMULA_AFFILIATE_URL = "https://example.com/formula"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_purchase)

        database = AppDatabase.getDatabase(this, lifecycleScope)
        consumptionPredictor = ConsumptionPredictor(this, database, lifecycleScope)

        setupUI()
        loadInventoryStatus()
    }

    private fun setupUI() {
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = "Purchase Supplies"
        }

        // TODO: Initialize UI components
        // - Display current inventory levels (if tracked)
        // - Show estimated days until running out
        // - Button to purchase Gelmix (opens affiliate link)
        // - Button to purchase formula (opens affiliate link)
        // - Input fields to update inventory after purchase
        // - Save button to record new inventory
        
        findViewById<android.view.View>(R.id.btn_purchase_gelmix)?.setOnClickListener {
            openAffiliateLink(GELMIX_AFFILIATE_URL)
        }

        findViewById<android.view.View>(R.id.btn_purchase_formula)?.setOnClickListener {
            openAffiliateLink(FORMULA_AFFILIATE_URL)
        }
    }

    private fun loadInventoryStatus() {
        lifecycleScope.launchWhenStarted {
            val (gelmixDays, formulaDays) = consumptionPredictor.predictDaysUntilRunOut()
            
            // Update UI with prediction
            // Show warning if running low
        }
    }

    private fun openAffiliateLink(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        startActivity(intent)
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
