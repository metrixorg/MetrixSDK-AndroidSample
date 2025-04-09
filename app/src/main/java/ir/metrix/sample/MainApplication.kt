package ir.metrix.sample

import android.app.Application
import android.util.Log
import com.google.firebase.messaging.FirebaseMessaging
import ir.metrix.attribution.MetrixAttribution

private const val TAG = "MetrixSampleApp"

class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        MetrixAttribution.setSignature("pmHhXFAuXDRYPZO6AQegjJ5khzTyLpP1MLO4AZacNSKpOxzsHk8lEhuxCTdeZHGfKCx1JIJerjFgAwQ6VGy0UDrpKfJnMAurnS5sboGfUuWuWRHkIBm2Cd0=")

        FirebaseMessaging.getInstance().token.addOnCompleteListener {
            if (it.isSuccessful) {
                it.result?.let { fcmToken -> Log.d(TAG, "firebaseMessaging token is:  $fcmToken") }
            } else {
                Log.d(TAG, "firebaseMessaging token retrieve fail")
            }
        }
    }
}