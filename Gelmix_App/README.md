# Gelmix App

An Android application to help parents prepare formula with Gelmix thickener for infants with swallowing difficulties. This app provides recipe lookup, feeding tracking, educational resources, and supply management.

## Features

### 1. Recipe Lookup
- Interactive interface to select formula type, brand, and desired thickness level
- Provides precise instructions for preparing bottles with the right volume and thickness (IDDSI levels 1-3)
- Optional 1-hour follow-up notification to track:
  - Whether formula had to be remade (and why)
  - Amount consumed by the child
  - Whether the child spit up
- All feeding records saved locally on device

### 2. Resources Page
- IDDSI introduction video
- Gelmix how-to video
- Links to helpful resources for parents and caregivers
- All content available offline where possible

### 3. Purchase Management
- Affiliate links to purchase Gelmix and formula
- Consumption tracking to predict when supplies will run out
- Smart notifications (2-5 day buffer) to remind parents to reorder
- Prevents running out of essential supplies

### 4. Offline Functionality
- All core features work without internet connection
- Local database storage using Room
- Recipes, resources, and feeding history stored on device
- Internet only needed for video streaming and purchasing

### 5. Update Framework
- Automatic update checking on app launch
- Version comparison and update notifications
- Framework for pushing critical updates
- Optional and required update support

### 6. Data Sharing (Optional & Privacy-Focused)
- Voluntary opt-in for sharing feeding data
- Parents can share personal stories and experiences
- Request data removal at any time
- Export personal data in JSON format
- Privacy-first design with full control

## Technical Architecture

### Technology Stack
- **Language**: Kotlin
- **Minimum SDK**: API 24 (Android 7.0)
- **Target SDK**: API 34 (Android 14)
- **Architecture**: MVVM (Model-View-ViewModel)
- **Database**: Room (SQLite)
- **Notifications**: AlarmManager + BroadcastReceivers
- **Background Tasks**: WorkManager (if needed)
- **JSON**: Gson

### Project Structure

```
Gelmix_App/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/gelmix/app/
│   │       │   ├── activities/          # UI Activities
│   │       │   │   ├── MainActivity.kt
│   │       │   │   ├── RecipeActivity.kt
│   │       │   │   ├── ResourcesActivity.kt
│   │       │   │   ├── PurchaseActivity.kt
│   │       │   │   ├── FeedingLogActivity.kt
│   │       │   │   ├── SettingsActivity.kt
│   │       │   │   └── DataSharingActivity.kt
│   │       │   ├── database/            # Room Database
│   │       │   │   ├── AppDatabase.kt
│   │       │   │   ├── AppDao.kt
│   │       │   │   └── Converters.kt
│   │       │   ├── models/              # Data Models
│   │       │   │   └── Models.kt
│   │       │   ├── notifications/       # Notification System
│   │       │   │   ├── FeedingReminderReceiver.kt
│   │       │   │   ├── PurchaseReminderReceiver.kt
│   │       │   │   └── BootReceiver.kt
│   │       │   └── utils/              # Helper Classes
│   │       │       ├── ConsumptionPredictor.kt
│   │       │       ├── DataSharingHelper.kt
│   │       │       └── UpdateChecker.kt
│   │       ├── res/                    # Resources
│   │       │   ├── layout/             # UI Layouts
│   │       │   ├── values/             # Strings, Colors, Themes
│   │       │   ├── drawable/           # Icons and Images
│   │       │   └── xml/                # Backup Rules
│   │       └── AndroidManifest.xml
│   ├── build.gradle
│   └── proguard-rules.pro
├── build.gradle
├── settings.gradle
└── gradle.properties
```

### Database Schema

#### Tables:
1. **recipes** - Formula recipes with preparation instructions
2. **feeding_records** - History of feedings with follow-up data
3. **consumption_tracking** - Supply usage for predictive restocking
4. **user_preferences** - App settings and configurations
5. **resources** - Educational resources and links

## Building the App

### Prerequisites
- Android Studio Arctic Fox or later
- JDK 8 or later
- Android SDK API 24 or higher

### Build Steps

1. **Open Project in Android Studio**
   ```bash
   # Open the Gelmix_App folder in Android Studio
   ```

2. **Sync Gradle**
   - Android Studio should automatically sync Gradle files
   - If not, click "Sync Project with Gradle Files" in the toolbar

3. **Build the App**
   ```bash
   # From command line:
   ./gradlew build
   
   # Or in Android Studio:
   # Build > Make Project
   ```

4. **Run on Device/Emulator**
   ```bash
   # From command line:
   ./gradlew installDebug
   
   # Or in Android Studio:
   # Run > Run 'app'
   ```

### Build Variants
- **Debug**: Development build with debugging enabled
- **Release**: Production build with ProGuard/R8 minification

## Development Roadmap

### Phase 1: Core Features (Current)
- [x] Project structure setup
- [x] Database schema and DAOs
- [x] Basic activity structure
- [x] Notification system framework
- [ ] Complete UI implementation
- [ ] Recipe lookup logic
- [ ] Feeding tracking functionality

### Phase 2: Enhanced Features
- [ ] Advanced recipe filtering
- [ ] Detailed feeding statistics
- [ ] Data export/import
- [ ] Offline video caching
- [ ] Widget for quick access

### Phase 3: Polish & Testing
- [ ] UI/UX improvements
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Multi-language support

## Privacy & Data Handling

### Local Storage
- All data stored locally using Room (SQLite)
- No data leaves device without explicit user consent
- Backup configured for user convenience (can be disabled)

### Data Sharing (Optional)
- **Opt-in only** - No data shared by default
- **Anonymized** - Personal identifiers removed
- **Revocable** - Users can request deletion
- **Transparent** - Users can export their data

### Permissions
- `INTERNET` - For video resources and affiliate links
- `POST_NOTIFICATIONS` - For feeding and purchase reminders
- `SCHEDULE_EXACT_ALARM` - For precise reminder timing
- `RECEIVE_BOOT_COMPLETED` - To reschedule reminders after reboot

## Contributing

This is an initial structure. Future iterations will refine features based on user feedback and testing.

## Affiliate Disclosure

This app contains affiliate links to Gelmix and formula products. Purchases through these links may provide commission to support app development.

## Support

For questions, issues, or feature requests, please contact the development team.

## License

[License information to be added]

## Acknowledgments

- IDDSI for dysphagia standards
- Gelmix for thickening product information
- Parents and caregivers for feedback and insights
