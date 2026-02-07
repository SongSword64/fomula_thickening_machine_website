package com.gelmix.app.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import androidx.sqlite.db.SupportSQLiteDatabase
import com.gelmix.app.models.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.Date

/**
 * Main Room database for the Gelmix App
 * Handles all local data storage for offline functionality
 */
@Database(
    entities = [
        Recipe::class,
        FeedingRecord::class,
        ConsumptionTracking::class,
        UserPreferences::class,
        Resource::class
    ],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {

    abstract fun recipeDao(): RecipeDao
    abstract fun feedingRecordDao(): FeedingRecordDao
    abstract fun consumptionTrackingDao(): ConsumptionTrackingDao
    abstract fun userPreferencesDao(): UserPreferencesDao
    abstract fun resourceDao(): ResourceDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context, scope: CoroutineScope): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "gelmix_database"
                )
                    .addCallback(AppDatabaseCallback(scope))
                    .build()
                INSTANCE = instance
                instance
            }
        }

        private class AppDatabaseCallback(
            private val scope: CoroutineScope
        ) : RoomDatabase.Callback() {
            override fun onCreate(db: SupportSQLiteDatabase) {
                super.onCreate(db)
                INSTANCE?.let { database ->
                    scope.launch(Dispatchers.IO) {
                        populateDatabase(database)
                    }
                }
            }
        }

        /**
         * Populate the database with initial data on first launch
         */
        suspend fun populateDatabase(database: AppDatabase) {
            val recipeDao = database.recipeDao()
            val resourceDao = database.resourceDao()
            val preferencesDao = database.userPreferencesDao()

            // Insert default user preferences
            preferencesDao.insertPreferences(
                UserPreferences(
                    enableNotifications = true,
                    feedingReminderEnabled = true,
                    purchaseReminderEnabled = true,
                    purchaseReminderBuffer = 3,
                    dataShareConsent = false
                )
            )

            // Insert sample recipes based on the website's FormulaTuning data
            val sampleRecipes = listOf(
                Recipe(
                    title = "Breast Milk",
                    brand = "N/A",
                    type = "Breast Milk",
                    category = "Single recipe",
                    url = "https://www.healthierthickening.com/recipes/breast-milk/",
                    instructions = "Mix according to IDDSI level requirements",
                    gelmixAmount = 0.0,
                    volumeOz = 4.0,
                    thicknessLevel = 1
                ),
                Recipe(
                    title = "Similac Advance (RTF) - IDDSI 1",
                    brand = "Similac",
                    type = "RTF",
                    category = "By Brand",
                    url = "https://www.healthierthickening.com/recipes/similac-advance-rtf/",
                    instructions = "For 4 oz bottle at IDDSI level 1 (Slightly Thick): Add 0.5 scoops Gelmix",
                    gelmixAmount = 0.5,
                    volumeOz = 4.0,
                    thicknessLevel = 1
                ),
                Recipe(
                    title = "Similac Advance (RTF) - IDDSI 2",
                    brand = "Similac",
                    type = "RTF",
                    category = "By Brand",
                    url = "https://www.healthierthickening.com/recipes/similac-advance-rtf/",
                    instructions = "For 4 oz bottle at IDDSI level 2 (Mildly Thick): Add 1.0 scoops Gelmix",
                    gelmixAmount = 1.0,
                    volumeOz = 4.0,
                    thicknessLevel = 2
                ),
                Recipe(
                    title = "Enfamil NeuroPro (Powder) - IDDSI 1",
                    brand = "Enfamil",
                    type = "Powder",
                    category = "By Brand",
                    url = "https://www.healthierthickening.com/recipes/enfamil-neuropro-powder/",
                    instructions = "For 4 oz bottle at IDDSI level 1 (Slightly Thick): Add 0.5 scoops Gelmix",
                    gelmixAmount = 0.5,
                    volumeOz = 4.0,
                    thicknessLevel = 1
                ),
                Recipe(
                    title = "Nutramigen (RTF) - IDDSI 1",
                    brand = "Nutramigen",
                    type = "RTF",
                    category = "By Brand",
                    url = "https://www.healthierthickening.com/recipes/nutramigen-rtf/",
                    instructions = "For 4 oz bottle at IDDSI level 1 (Slightly Thick): Add 0.5 scoops Gelmix",
                    gelmixAmount = 0.5,
                    volumeOz = 4.0,
                    thicknessLevel = 1
                )
            )
            recipeDao.insertRecipes(sampleRecipes)

            // Insert resources based on the website's Resources page
            val resources = listOf(
                Resource(
                    title = "IDDSI Introduction",
                    description = "IDDSI develops globally accepted standards for texture-modified foods and liquids to help people with swallowing difficulties.",
                    type = "video",
                    url = "https://www.youtube.com/watch?v=xHxntTb9Yac",
                    category = "IDDSI"
                ),
                Resource(
                    title = "Gelmix How-To Video",
                    description = "Learn how to properly prepare formula with Gelmix thickener for safe feeding.",
                    type = "video",
                    url = "https://www.youtube.com/watch?v=iQQrlMg0SjY",
                    category = "Gelmix"
                ),
                Resource(
                    title = "IDDSI Website",
                    description = "Official IDDSI website with testing methods, charts, and clinical guidance.",
                    type = "link",
                    url = "https://iddsi.org",
                    category = "IDDSI"
                ),
                Resource(
                    title = "Gelmix Official Website",
                    description = "Official Gelmix website with recipes and product information.",
                    type = "link",
                    url = "https://gelmix.com",
                    category = "Gelmix"
                ),
                Resource(
                    title = "Feeding Matters",
                    description = "Nonprofit supporting families through education and resources on pediatric feeding disorders.",
                    type = "link",
                    url = "https://feedingmatters.org",
                    category = "General"
                )
            )
            resourceDao.insertResources(resources)
        }
    }
}
