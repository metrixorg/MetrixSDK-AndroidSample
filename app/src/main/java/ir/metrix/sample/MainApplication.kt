package ir.metrix.sample

import android.app.Application
import android.util.Log
import com.google.firebase.messaging.FirebaseMessaging

private const val TAG = "MetrixSampleApp"

class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        FirebaseMessaging.getInstance().token.addOnCompleteListener {
            if (it.isSuccessful) {
                it.result?.let { fcmToken ->
                    Log.d(TAG, "firebaseMessaging token is:  $fcmToken")
                }

            } else {
                Log.d(TAG, "firebaseMessaging token retrieve fail")
            }
        }
    }
}