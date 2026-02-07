package com.gelmix.app.models

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

/**
 * Represents a recipe for preparing formula with specific thickness levels
 */
@Entity(tableName = "recipes")
data class Recipe(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val brand: String,
    val type: String, // RTF, Powder, etc.
    val category: String, // Single recipe, By Brand, By Type
    val url: String? = null,
    val instructions: String,
    val gelmixAmount: Double, // in grams or scoops
    val volumeOz: Double,
    val thicknessLevel: Int, // IDDSI level 1-3
    val isOfflineAvailable: Boolean = true,
    val lastUpdated: Date = Date()
)

/**
 * Represents a feeding record for tracking infant formula consumption
 */
@Entity(tableName = "feeding_records")
data class FeedingRecord(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val recipeId: Long,
    val recipeName: String,
    val timestamp: Date,
    val volumePrepared: Double, // in oz
    val volumeConsumed: Double, // in oz
    val thicknessLevel: Int,
    val wasRemade: Boolean = false,
    val remakeReason: String? = null,
    val didSpitUp: Boolean = false,
    val notes: String? = null,
    val followUpCompleted: Boolean = false,
    val followUpTimestamp: Date? = null
)

/**
 * Represents consumption tracking for predicting when to reorder supplies
 */
@Entity(tableName = "consumption_tracking")
data class ConsumptionTracking(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val gelmixUsed: Double, // in grams
    val formulaUsed: Double, // in oz
    val date: Date = Date(),
    val gelmixRemaining: Double? = null, // Optional: if user tracks inventory
    val formulaRemaining: Double? = null
)

/**
 * User preferences and settings
 */
@Entity(tableName = "user_preferences")
data class UserPreferences(
    @PrimaryKey
    val id: Int = 1, // Single row for preferences
    val enableNotifications: Boolean = true,
    val feedingReminderEnabled: Boolean = true,
    val purchaseReminderEnabled: Boolean = true,
    val purchaseReminderBuffer: Int = 3, // days before running out
    val dataShareConsent: Boolean = false,
    val lastUpdateCheck: Date? = null,
    val appVersion: String = "1.0.0"
)

/**
 * Resource information for offline access
 */
@Entity(tableName = "resources")
data class Resource(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val description: String,
    val type: String, // video, article, link
    val url: String,
    val thumbnailUrl: String? = null,
    val isOfflineAvailable: Boolean = false,
    val category: String // IDDSI, Gelmix, General
)
