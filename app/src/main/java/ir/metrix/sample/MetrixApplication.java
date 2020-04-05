package ir.metrix.sample;

import android.app.Application;

import ir.metrix.sdk.Metrix;
import ir.metrix.sdk.MetrixConfig;
import ir.metrix.sdk.OnAttributionChangedListener;
import ir.metrix.sdk.network.model.AttributionModel;


public class MetrixApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        MetrixConfig metrixConfig = new MetrixConfig(this, BuildConfig.METRIX_KEY);
        metrixConfig.setScreenFlowsAutoFill(true);
        metrixConfig.setOnAttributionChangedListener(new OnAttributionChangedListener() {
            @Override
            public void onAttributionChanged(AttributionModel attributionModel) {

            }
        });

        Metrix.onCreate(metrixConfig);
    }
}
