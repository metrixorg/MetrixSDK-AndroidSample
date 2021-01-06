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

        Metrix.setStore("GooglePlay");

        Map<String, String> userAttributes = new HashMap<>();
        userAttributes.put("phoneNumber", "09121111111");
        Metrix.addUserAttributes(userAttributes);

        Metrix.setUserIdListener(new UserIdListener() {
            @Override
            public void onUserIdReceived(String id) {
                Log.d(TAG, "onUserIdReceived: Metrix userId: " + id);
            }
        });

        Metrix.setOnAttributionChangedListener(new OnAttributionChangeListener() {
            @Override
            public void onAttributionChanged(AttributionData attributionData) {
                Log.d(TAG, "onAttributionChanged: userAttributionStatus: " + attributionData.attributionStatus);
            }
        });
    }
}
