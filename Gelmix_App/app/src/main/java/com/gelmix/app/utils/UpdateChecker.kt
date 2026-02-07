package com.gelmix.app.utils

import android.content.Context
import android.content.pm.PackageManager
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.URL

/**
 * Helper class for checking app updates
 * Implements framework for pushing updates to the app
 */
class UpdateChecker(private val context: Context) {

    companion object {
        // In production, this would be your actual update check endpoint
        private const val UPDATE_CHECK_URL = "https://api.gelmix.app/update/check"
        private const val MINIMUM_CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000L // 24 hours
    }

    data class UpdateInfo(
        val isUpdateAvailable: Boolean,
        val latestVersion: String,
        val currentVersion: String,
        val updateUrl: String?,
        val releaseNotes: String?,
        val isRequired: Boolean = false
    )

    /**
     * Get the current app version
     */
    fun getCurrentVersion(): String {
        return try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            packageInfo.versionName ?: "1.0.0"
        } catch (e: PackageManager.NameNotFoundException) {
            "1.0.0"
        }
    }

    /**
     * Get the current version code
     */
    fun getCurrentVersionCode(): Long {
        return try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
                packageInfo.longVersionCode
            } else {
                @Suppress("DEPRECATION")
                packageInfo.versionCode.toLong()
            }
        } catch (e: PackageManager.NameNotFoundException) {
            1L
        }
    }

    /**
     * Check for app updates from the server
     * @return UpdateInfo with details about available updates
     */
    suspend fun checkForUpdates(): UpdateInfo = withContext(Dispatchers.IO) {
        try {
            // In production, this would make an actual HTTP request
            // For now, we simulate the response structure
            val currentVersion = getCurrentVersion()
            
            // Simulated server response
            // In production: val response = URL(UPDATE_CHECK_URL).readText()
            // val json = JSONObject(response)
            
            // Placeholder - no update available
            UpdateInfo(
                isUpdateAvailable = false,
                latestVersion = currentVersion,
                currentVersion = currentVersion,
                updateUrl = null,
                releaseNotes = null,
                isRequired = false
            )
        } catch (e: Exception) {
            // If check fails, return current version info
            val currentVersion = getCurrentVersion()
            UpdateInfo(
                isUpdateAvailable = false,
                latestVersion = currentVersion,
                currentVersion = currentVersion,
                updateUrl = null,
                releaseNotes = "Unable to check for updates",
                isRequired = false
            )
        }
    }

    /**
     * Check if enough time has passed since last update check
     */
    fun shouldCheckForUpdates(lastCheckTimestamp: Long): Boolean {
        val currentTime = System.currentTimeMillis()
        return (currentTime - lastCheckTimestamp) >= MINIMUM_CHECK_INTERVAL_MS
    }

    /**
     * Parse a version string to compare versions
     * Returns positive if v1 > v2, negative if v1 < v2, zero if equal
     */
    fun compareVersions(v1: String, v2: String): Int {
        val parts1 = v1.split(".").map { it.toIntOrNull() ?: 0 }
        val parts2 = v2.split(".").map { it.toIntOrNull() ?: 0 }
        
        val maxLength = maxOf(parts1.size, parts2.size)
        
        for (i in 0 until maxLength) {
            val part1 = parts1.getOrNull(i) ?: 0
            val part2 = parts2.getOrNull(i) ?: 0
            
            if (part1 != part2) {
                return part1 - part2
            }
        }
        
        return 0
    }

    /**
     * Open the Play Store page for the app (for updates)
     */
    fun openPlayStoreForUpdate() {
        try {
            val intent = android.content.Intent(
                android.content.Intent.ACTION_VIEW,
                android.net.Uri.parse("market://details?id=${context.packageName}")
            )
            intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
        } catch (e: android.content.ActivityNotFoundException) {
            // If Play Store app is not available, open in browser
            val intent = android.content.Intent(
                android.content.Intent.ACTION_VIEW,
                android.net.Uri.parse("https://play.google.com/store/apps/details?id=${context.packageName}")
            )
            intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
        }
    }
}
