package ir.metrix.sample;

import androidx.appcompat.app.AppCompatActivity;
import ir.metrix.Metrix;

import android.os.Bundle;

import java.util.HashMap;
import java.util.Map;

public class SecondActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        Map<String, String> attributes = new HashMap<>();
        attributes.put("Activity", "SecondActivity");
        Metrix.newEvent("ilion", attributes);
    }
}
