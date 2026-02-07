package com.gelmix.app.database

import androidx.lifecycle.LiveData
import androidx.room.*
import com.gelmix.app.models.*
import java.util.Date

/**
 * Data Access Object for Recipe operations
 */
@Dao
interface RecipeDao {
    @Query("SELECT * FROM recipes ORDER BY title ASC")
    fun getAllRecipes(): LiveData<List<Recipe>>

    @Query("SELECT * FROM recipes WHERE brand = :brand")
    fun getRecipesByBrand(brand: String): LiveData<List<Recipe>>

    @Query("SELECT * FROM recipes WHERE type = :type")
    fun getRecipesByType(type: String): LiveData<List<Recipe>>

    @Query("SELECT * FROM recipes WHERE id = :recipeId")
    fun getRecipeById(recipeId: Long): LiveData<Recipe>

    @Query("SELECT DISTINCT brand FROM recipes ORDER BY brand ASC")
    fun getAllBrands(): LiveData<List<String>>

    @Query("SELECT DISTINCT type FROM recipes ORDER BY type ASC")
    fun getAllTypes(): LiveData<List<String>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRecipe(recipe: Recipe): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRecipes(recipes: List<Recipe>)

    @Update
    suspend fun updateRecipe(recipe: Recipe)

    @Delete
    suspend fun deleteRecipe(recipe: Recipe)
}

/**
 * Data Access Object for FeedingRecord operations
 */
@Dao
interface FeedingRecordDao {
    @Query("SELECT * FROM feeding_records ORDER BY timestamp DESC")
    fun getAllFeedingRecords(): LiveData<List<FeedingRecord>>

    @Query("SELECT * FROM feeding_records WHERE id = :recordId")
    fun getFeedingRecordById(recordId: Long): LiveData<FeedingRecord>

    @Query("SELECT * FROM feeding_records WHERE timestamp >= :startDate ORDER BY timestamp DESC")
    fun getFeedingRecordsSince(startDate: Date): LiveData<List<FeedingRecord>>

    @Query("SELECT * FROM feeding_records WHERE followUpCompleted = 0 ORDER BY timestamp DESC")
    fun getPendingFollowUps(): LiveData<List<FeedingRecord>>

    @Query("SELECT SUM(volumeConsumed) FROM feeding_records WHERE timestamp >= :startDate")
    suspend fun getTotalVolumeConsumed(startDate: Date): Double?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFeedingRecord(record: FeedingRecord): Long

    @Update
    suspend fun updateFeedingRecord(record: FeedingRecord)

    @Delete
    suspend fun deleteFeedingRecord(record: FeedingRecord)

    @Query("DELETE FROM feeding_records")
    suspend fun deleteAllFeedingRecords()
}

/**
 * Data Access Object for ConsumptionTracking operations
 */
@Dao
interface ConsumptionTrackingDao {
    @Query("SELECT * FROM consumption_tracking ORDER BY date DESC")
    fun getAllConsumptionRecords(): LiveData<List<ConsumptionTracking>>

    @Query("SELECT SUM(gelmixUsed) FROM consumption_tracking WHERE date >= :startDate")
    suspend fun getTotalGelmixUsed(startDate: Date): Double?

    @Query("SELECT SUM(formulaUsed) FROM consumption_tracking WHERE date >= :startDate")
    suspend fun getTotalFormulaUsed(startDate: Date): Double?

    @Query("SELECT * FROM consumption_tracking ORDER BY date DESC LIMIT 1")
    suspend fun getLatestConsumption(): ConsumptionTracking?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertConsumptionRecord(record: ConsumptionTracking): Long

    @Update
    suspend fun updateConsumptionRecord(record: ConsumptionTracking)

    @Delete
    suspend fun deleteConsumptionRecord(record: ConsumptionTracking)
}

/**
 * Data Access Object for UserPreferences operations
 */
@Dao
interface UserPreferencesDao {
    @Query("SELECT * FROM user_preferences WHERE id = 1")
    fun getPreferences(): LiveData<UserPreferences>

    @Query("SELECT * FROM user_preferences WHERE id = 1")
    suspend fun getPreferencesSync(): UserPreferences?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPreferences(preferences: UserPreferences)

    @Update
    suspend fun updatePreferences(preferences: UserPreferences)
}

/**
 * Data Access Object for Resource operations
 */
@Dao
interface ResourceDao {
    @Query("SELECT * FROM resources ORDER BY category, title ASC")
    fun getAllResources(): LiveData<List<Resource>>

    @Query("SELECT * FROM resources WHERE category = :category ORDER BY title ASC")
    fun getResourcesByCategory(category: String): LiveData<List<Resource>>

    @Query("SELECT * FROM resources WHERE id = :resourceId")
    fun getResourceById(resourceId: Long): LiveData<Resource>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertResource(resource: Resource): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertResources(resources: List<Resource>)

    @Update
    suspend fun updateResource(resource: Resource)

    @Delete
    suspend fun deleteResource(resource: Resource)
}
