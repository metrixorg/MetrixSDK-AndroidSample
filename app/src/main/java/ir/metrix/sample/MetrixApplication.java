package ir.metrix.sample;

import android.app.Application;

import ir.metrix.sdk.Metrix;
import ir.metrix.sdk.OnAttributionChangedListener;
import ir.metrix.sdk.network.model.AttributionModel;


public class MetrixApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        Metrix.initialize(this, BuildConfig.METRIX_KEY);
        Metrix.getInstance().setScreenFlowsAutoFill(true);
        Metrix.getInstance().setOnAttributionChangedListener(new OnAttributionChangedListener() {
            @Override
            public void onAttributionChanged(AttributionModel attributionModel) {


            }
        });
    }
}
