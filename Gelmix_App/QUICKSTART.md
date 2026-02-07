# Gelmix App - Quick Start Guide

This guide will help you get started with the Gelmix Android app development.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Android Studio** (Arctic Fox or later)
   - Download from: https://developer.android.com/studio
   
2. **Java Development Kit (JDK) 8+**
   - Included with Android Studio, or download separately
   
3. **Android SDK**
   - API Level 24 (Android 7.0) minimum
   - API Level 34 (Android 14) target
   - Install via Android Studio SDK Manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SongSword64/fomula_thickening_machine_website.git
cd fomula_thickening_machine_website/Gelmix_App
```

### 2. Open in Android Studio

1. Launch Android Studio
2. Select "Open an Existing Project"
3. Navigate to the `Gelmix_App` folder
4. Click "OK"

### 3. Sync Gradle

Android Studio should automatically start syncing Gradle files. If not:
1. Click "File" → "Sync Project with Gradle Files"
2. Wait for sync to complete (may take a few minutes on first run)

### 4. Configure an Android Device

#### Option A: Physical Device
1. Enable Developer Options on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"
2. Connect device via USB
3. Accept debugging prompt on device

#### Option B: Android Emulator
1. In Android Studio, click "Tools" → "Device Manager"
2. Click "Create Device"
3. Select a phone model (e.g., Pixel 6)
4. Select a system image (API 24 or higher)
5. Click "Finish"

### 5. Build and Run

#### From Android Studio:
1. Click the "Run" button (green triangle) in the toolbar
2. Select your device/emulator
3. Wait for build to complete and app to launch

#### From Command Line:
```bash
# Debug build
./gradlew assembleDebug

# Install on connected device
./gradlew installDebug

# Build and run
./gradlew installDebug && adb shell am start -n com.gelmix.app/.activities.MainActivity
```

## Project Structure Overview

```
Gelmix_App/
├── app/
│   ├── src/main/
│   │   ├── java/com/gelmix/app/
│   │   │   ├── activities/      # UI Activities (7 files)
│   │   │   ├── database/        # Room Database (3 files)
│   │   │   ├── models/          # Data Models (1 file)
│   │   │   ├── notifications/   # Notification System (3 files)
│   │   │   └── utils/           # Helper Classes (3 files)
│   │   ├── res/                 # Resources (layouts, strings, etc.)
│   │   └── AndroidManifest.xml
│   └── build.gradle             # App-level build configuration
├── build.gradle                 # Project-level build configuration
└── settings.gradle              # Gradle settings
```

## Key Files to Know

### Activities (User Interface)
- `MainActivity.kt` - Main menu/navigation
- `RecipeActivity.kt` - Recipe lookup interface
- `FeedingLogActivity.kt` - Feeding history viewer
- `PurchaseActivity.kt` - Supply management and affiliate links
- `ResourcesActivity.kt` - Educational resources
- `SettingsActivity.kt` - App settings
- `DataSharingActivity.kt` - Data privacy controls

### Database
- `AppDatabase.kt` - Room database configuration
- `AppDao.kt` - Data Access Objects for all queries
- `Models.kt` - All data models (5 entities)

### Business Logic
- `ConsumptionPredictor.kt` - Predicts when to reorder supplies
- `DataSharingHelper.kt` - Handles data export and sharing
- `UpdateChecker.kt` - Checks for app updates

## Common Development Tasks

### Adding a New Feature

1. **Create the UI**
   - Add/modify layout XML in `res/layout/`
   - Update `res/values/strings.xml` for new text

2. **Implement Business Logic**
   - Add methods to existing Activity or create new utility class
   - Use coroutines for database/network operations

3. **Update Database (if needed)**
   - Modify models in `Models.kt`
   - Update DAOs in `AppDao.kt`
   - Increment database version in `AppDatabase.kt`
   - Add migration if needed

### Running Tests

```bash
# Unit tests
./gradlew test

# Android instrumented tests
./gradlew connectedAndroidTest
```

### Building Release APK

```bash
# Build release APK (unsigned)
./gradlew assembleRelease

# Output location:
# app/build/outputs/apk/release/app-release-unsigned.apk
```

### Debugging Tips

1. **View Logs**
   ```bash
   # View all logs
   adb logcat
   
   # Filter by app
   adb logcat | grep "com.gelmix.app"
   
   # In Android Studio: View → Tool Windows → Logcat
   ```

2. **Inspect Database**
   ```bash
   # Access device shell
   adb shell
   
   # Navigate to app data (requires root or debuggable app)
   cd /data/data/com.gelmix.app/databases/
   sqlite3 gelmix_database
   ```

3. **Clear App Data**
   ```bash
   adb shell pm clear com.gelmix.app
   ```

## Current Implementation Status

### ✅ Completed
- Project structure and build configuration
- Database schema with 5 entities
- All 7 activity class files
- Notification system framework
- Utility classes for business logic
- Basic UI layouts (placeholder)
- Resource files (strings, colors, themes)

### 🚧 In Progress / TODO
- Complete UI implementation for all activities
- Add RecyclerView adapters for lists
- Implement recipe filtering logic
- Add data visualization
- Create comprehensive tests
- Add accessibility features
- Implement actual backend API (currently local only)

## Need Help?

### Documentation
- Android Developer Guides: https://developer.android.com/guide
- Kotlin Documentation: https://kotlinlang.org/docs/home.html
- Room Database: https://developer.android.com/training/data-storage/room

### Common Issues

**Issue: Gradle sync failed**
- Solution: Check your internet connection and try "File → Invalidate Caches / Restart"

**Issue: App crashes on launch**
- Solution: Check Logcat for stack trace. Verify database initialization.

**Issue: Emulator is slow**
- Solution: Ensure hardware acceleration is enabled. Use x86 system images.

**Issue: Build takes too long**
- Solution: Enable Gradle daemon and parallel builds in `gradle.properties`

## Contributing

Future contributions should:
1. Follow Kotlin coding conventions
2. Add appropriate comments and documentation
3. Test changes thoroughly
4. Update this guide if adding new features

## Next Steps

Once you have the app running, consider:
1. Completing the UI for `RecipeActivity`
2. Implementing the RecyclerView for `FeedingLogActivity`
3. Adding real recipe data to the database
4. Testing the notification system
5. Implementing data visualization for feeding statistics

Happy coding! 🎉
