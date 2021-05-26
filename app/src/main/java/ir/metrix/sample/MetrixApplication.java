package ir.metrix.sample;

import android.app.Application;
import android.util.Log;

import java.util.HashMap;
import java.util.Map;

import ir.metrix.AttributionData;
import ir.metrix.Metrix;
import ir.metrix.OnAttributionChangeListener;
import ir.metrix.UserIdListener;

public class MetrixApplication extends Application {

    private static final String TAG = "MetrixApplication";

    @Override
    public void onCreate() {
        super.onCreate();

        Map<String, String> userAttributes = new HashMap<>();
        userAttributes.put("phoneNumber", "09121111111");
        Metrix.addUserAttributes(userAttributes);

        Metrix.setUserIdListener(id ->
                Log.d(TAG, "onUserIdReceived: Metrix userId: " + id));

        Metrix.setOnAttributionChangedListener(attributionData ->
                Log.d(TAG, "onAttributionChanged: userAttributionStatus: " + attributionData.getAttributionStatus()));
    }
}
