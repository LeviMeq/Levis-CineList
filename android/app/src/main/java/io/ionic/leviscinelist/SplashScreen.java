package io.ionic.leviscinelist;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.LinearLayout;
import androidx.appcompat.app.AppCompatActivity;

public class SplashScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        // Cacher la barre de statut pour faire un écran complet
        getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        // Référence au LinearLayout pour l'animation
        LinearLayout linearLayout = findViewById(R.id.linearLayout);
        Animation slideAnimation = AnimationUtils.loadAnimation(this, R.anim.side_slide);
        linearLayout.startAnimation(slideAnimation);

        // Délai avant de lancer MainActivity
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashScreen.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        }, 2000); // 2000 ms de délai
    }
}
