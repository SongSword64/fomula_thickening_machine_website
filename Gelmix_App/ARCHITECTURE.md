# Gelmix Android App - Architecture Overview

## Project Summary

The Gelmix Android app is designed to help parents prepare formula with Gelmix thickener for infants with swallowing difficulties (dysphagia). The app addresses all six requirements from the problem statement while prioritizing offline functionality, privacy, and user control.

## Requirements Mapping

### 1. Recipe Lookup Page ✅
**Implementation:**
- `RecipeActivity` - Interactive UI for selecting formula type, brand, and thickness level
- `Recipe` model with support for IDDSI levels 1-3
- `RecipeDao` for querying recipes by brand, type, and thickness
- Local database prepopulated with recipes based on the website's FormulaTuning.jsx
- **1-hour follow-up notification**: `FeedingReminderReceiver` schedules notifications
- **Local record storage**: `FeedingRecord` entity stores all feeding details including:
  - Whether bottle was remade (and why)
  - Amount consumed
  - Spit-up incidents
  - Follow-up completion status

### 2. Resources Page ✅
**Implementation:**
- `ResourcesActivity` displays educational content
- `Resource` model with categories (IDDSI, Gelmix, General)
- Resources prepopulated from website's Resources.jsx including:
  - IDDSI introduction video (YouTube embed)
  - Gelmix how-to video (YouTube embed)
  - Links to IDDSI.org, Gelmix.com, Feeding Matters
- Offline support: Resources stored locally, only streaming requires internet

### 3. Purchase Page (No Personal References) ✅
**Implementation:**
- `PurchaseActivity` with affiliate link support
- **NO personal information or references** to maintain user privacy
- `ConsumptionPredictor` utility class analyzes feeding patterns to predict supply depletion
- `PurchaseReminderReceiver` provides 2-5 day buffer notifications
- Algorithm:
  1. Tracks Gelmix and formula usage from `ConsumptionTracking` table
  2. Calculates average daily consumption (last 7 days)
  3. Predicts days until running out
  4. Schedules notification X days before depletion (user configurable: 2-5 days)

### 4. Offline Functionality ✅
**Implementation:**
- **Room Database** (SQLite) for all data storage
- All core features work without internet:
  - Recipe lookup
  - Feeding tracking
  - Resource information (except video streaming)
  - Settings management
- Data persists locally on device
- Only internet-dependent features:
  - Video streaming
  - Affiliate link navigation
  - Optional data sharing (when enabled)

### 5. Update Framework ✅
**Implementation:**
- `UpdateChecker` utility class handles version management
- `MainActivity` checks for updates on app start (max once per 24 hours)
- Features:
  - Version comparison logic
  - Update notification dialog
  - Optional vs. required updates
  - Direct link to Play Store for updates
- Extensible design allows future backend integration for update metadata

### 6. Voluntary Data Sharing ✅
**Implementation:**
- `DataSharingActivity` with comprehensive privacy controls
- `DataSharingHelper` manages data export and sharing
- **Privacy-first design**:
  - Opt-in only (disabled by default)
  - Clear consent UI with explanation
  - Export personal data in JSON format
  - Request data deletion at any time
  - Share personal stories (optional public/private flag)
- `UserPreferences.dataShareConsent` tracks consent status
- All data operations require explicit user action

## Technical Architecture

### Layer Architecture

```
┌─────────────────────────────────────┐
│         UI Layer (Activities)        │
│  - MainActivity                      │
│  - RecipeActivity                    │
│  - ResourcesActivity                 │
│  - PurchaseActivity                  │
│  - FeedingLogActivity                │
│  - SettingsActivity                  │
│  - DataSharingActivity               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Business Logic Layer            │
│  - ConsumptionPredictor              │
│  - DataSharingHelper                 │
│  - UpdateChecker                     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       Data Layer (Room)              │
│  - AppDatabase                       │
│  - DAOs (5 interfaces)               │
│  - Models (5 entities)               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      System Layer                    │
│  - Notification Receivers            │
│  - AlarmManager                      │
│  - Local Storage (SQLite)            │
└─────────────────────────────────────┘
```

### Data Flow Examples

#### Recipe Lookup Flow
1. User opens `RecipeActivity`
2. Selects formula brand, type, thickness level, and volume
3. App queries `RecipeDao` for matching recipes
4. Displays instructions from local database
5. User starts feeding → Creates `FeedingRecord`
6. `FeedingReminderReceiver` schedules 1-hour notification
7. After 1 hour, notification prompts for follow-up
8. User completes follow-up → Updates `FeedingRecord`
9. `ConsumptionPredictor` records usage in `ConsumptionTracking`

#### Purchase Reminder Flow
1. User records feedings over time
2. `ConsumptionTracking` accumulates usage data
3. `ConsumptionPredictor.checkAndSchedulePurchaseReminder()` called after each feeding
4. Calculates days until running out based on average consumption
5. If within buffer period → `PurchaseReminderReceiver` scheduled
6. Notification appears with estimated days remaining
7. User clicks notification → Opens `PurchaseActivity`
8. User purchases supplies via affiliate links
9. User updates inventory → Prediction recalculated

## Database Schema

### Entity Relationships

```
UserPreferences (1 row)
  - Settings and preferences
  - Data sharing consent
  
Recipe (Many)
  - Formula recipes
  - IDDSI instructions
  
FeedingRecord (Many)
  ├── References Recipe (recipeId)
  └── Tracks individual feedings
  
ConsumptionTracking (Many)
  - Usage over time
  - Inventory levels
  
Resource (Many)
  - Educational content
  - Videos and links
```

## Notification System

### Two Types of Notifications

1. **Feeding Reminders** (FeedingReminderReceiver)
   - Trigger: 1 hour after feeding started
   - Purpose: Collect follow-up data
   - Data collected: Remake reason, consumption, spit-up
   - Cancelable: User can dismiss if not needed

2. **Purchase Reminders** (PurchaseReminderReceiver)
   - Trigger: X days before supplies run out (2-5 day buffer)
   - Purpose: Prevent running out of supplies
   - Calculation: Based on consumption patterns
   - Smart: Only notifies when prediction confidence is high

### Boot Handling
- `BootReceiver` listens for `BOOT_COMPLETED`
- Reschedules any pending notifications
- Ensures reminders persist across reboots

## Privacy & Security

### Data Storage
- All data in local SQLite database
- No cloud sync by default
- Android backup enabled (can be disabled by user)
- ProGuard/R8 minification in release builds

### Data Sharing
- **Explicit opt-in required**
- **Anonymization** of shared data
- **Revocable consent** at any time
- **Export capability** for user transparency
- **Deletion requests** honored immediately

### Permissions Justification
- `INTERNET` - Only for videos and affiliate links
- `POST_NOTIFICATIONS` - User-requested reminders
- `SCHEDULE_EXACT_ALARM` - Precise 1-hour follow-ups
- `RECEIVE_BOOT_COMPLETED` - Maintain reminders after reboot

## Future Enhancements

### Phase 2 Possibilities
1. **Enhanced Recipe Features**
   - Advanced filtering and search
   - Favorite recipes
   - Recipe notes and modifications
   - Photo attachments for feeding records

2. **Analytics & Insights**
   - Feeding pattern visualization
   - Progress charts
   - Export reports for healthcare providers
   - Trend analysis

3. **Social Features**
   - Anonymous community forum
   - Share success stories
   - Parent support groups

4. **Integration**
   - Healthcare provider portal
   - Calendar integration
   - Wearable device support
   - Voice assistant integration

5. **Advanced Notifications**
   - Feeding schedule suggestions
   - Growth milestone tracking
   - Medication reminders
   - Appointment reminders

## Development Guidelines

### Code Style
- Kotlin coding conventions
- MVVM architecture pattern
- Repository pattern for data access
- Dependency injection (consider adding Hilt/Dagger)

### Testing Strategy
- Unit tests for business logic
- Room database tests
- UI tests with Espresso
- Integration tests for critical flows

### Performance
- Lazy loading for large lists
- RecyclerView for efficient scrolling
- Background processing for heavy operations
- Optimized database queries

## Deployment Checklist

Before publishing to Play Store:
- [ ] Complete all UI implementations
- [ ] Add comprehensive error handling
- [ ] Implement accessibility features
- [ ] Add analytics (privacy-friendly)
- [ ] Create app screenshots and descriptions
- [ ] Test on various devices and Android versions
- [ ] Conduct security audit
- [ ] Prepare privacy policy
- [ ] Set up app signing
- [ ] Configure Play Store listing

## Support & Maintenance

### User Support
- In-app help documentation
- Email support contact
- FAQ section
- Tutorial/onboarding flow

### Monitoring
- Crash reporting (Firebase Crashlytics or similar)
- Performance monitoring
- User feedback collection
- Version adoption tracking

### Updates
- Regular dependency updates
- Security patches
- Feature additions based on feedback
- Bug fixes and performance improvements

## Conclusion

This Android app structure provides a solid foundation for all six requirements while maintaining a focus on offline functionality, privacy, and user control. The modular architecture allows for easy expansion and refinement through future iterations based on user feedback and testing.
