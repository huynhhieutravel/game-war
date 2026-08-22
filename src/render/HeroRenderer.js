export class HeroRenderer {
  static render(ctx, hero, camera, groundY) {
    HeroRenderer.drawHero(ctx, hero, camera, groundY);
  }

  static getAnimState(hero) {
    const walk = hero.state === 'walking' ? Math.sin((hero.animTimer || 0) * 10) : 0;
    const attackProgress = hero.state === 'attacking' ? (1 - hero.attackTimer / hero.attackCooldown) : 0;
    
    let swing = 0;
    if (hero.state === 'attacking') {
      if (attackProgress < 0.2) swing = -attackProgress * 3; // Pull back
      else if (attackProgress < 0.4) swing = (attackProgress - 0.2) * 10; // Strike
      else swing = 2 - (attackProgress - 0.4) * 1.5; // Recover
    }
    
    let cast = 0;
    if (hero.state === 'attacking') {
      cast = Math.sin(attackProgress * Math.PI); // Pulse
    }
    
    return { walk, swing, cast, attackProgress };
  }

  static drawHero(ctx, hero, camera = null, groundY = null) {
    const screenX = camera ? camera.worldToScreen(hero.x) : hero.x;
    const screenY = groundY !== null ? groundY : hero.y;

    if (camera && (screenX < -200 || screenX > camera.viewportWidth + 200)) return;

    const isPlayer = hero.faction === 'player';
    const dir = isPlayer ? 1 : -1;
    const { walk, swing, cast, attackProgress } = HeroRenderer.getAnimState(hero);

    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.scale(dir, 1);

    // Death state
    if (hero.state === 'dying') {
      const deathProgress = 1 - (hero.deathTimer / hero.deathDuration);
      ctx.globalAlpha = Math.max(0, 1 - deathProgress);
      ctx.translate(0, deathProgress * 30);
      ctx.rotate(deathProgress * 2);
    } else if (hero.state === 'dead') {
      ctx.restore();
      return;
    }

    // 1. Radiant Heroic Aura (Animated Glow)
    const auraPulse = Math.sin((hero.animTimer || 0) * 6) * 0.2 + 0.8;
    ctx.save();
    ctx.shadowColor = hero.config?.glowColor || '#fbbf24';
    ctx.shadowBlur = 25 * auraPulse;
    ctx.strokeStyle = hero.config?.glowColor || 'rgba(251, 191, 36, 0.8)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, -4, 35, 12, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Aura particles floating up
    ctx.fillStyle = ctx.strokeStyle;
    ctx.globalAlpha = 0.5;
    for(let i=0; i<3; i++) {
      const px = Math.sin((hero.animTimer || 0) * 3 + i) * 20;
      const py = -((hero.animTimer * 20 + i * 15) % 60);
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Custom Faction Hero Character
    if (hero.factionType === 'beast') {
      HeroRenderer.drawFenrir(ctx, hero, walk, swing, cast);
    } else if (hero.factionType === 'undead') {
      HeroRenderer.drawMalakor(ctx, hero, walk, swing, cast);
    } else {
      HeroRenderer.drawAlexander(ctx, hero, walk, swing, cast);
    }

    ctx.restore();

    // Health Bar
    if (hero.state !== 'dying' && hero.state !== 'dead') {
      HeroRenderer.renderHealthBar(ctx, hero, screenX, screenY);
    }
  }

  static drawFenrir(ctx, hero, walk, swing, cast) {
    const bounce = Math.abs(walk) * 3;
    ctx.save();
    ctx.translate(0, -bounce);

    // Back Legs
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-20 + walk * 12, -15, 8, 15);
    ctx.fillRect(15 + walk * 12, -15, 8, 15);

    // Body
    ctx.fillStyle = '#1e3a1e';
    ctx.beginPath();
    ctx.ellipse(0, -30, 32, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fur mane
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.moveTo(-15, -45);
    ctx.lineTo(20, -45);
    ctx.lineTo(30, -25);
    ctx.lineTo(10, -12);
    ctx.closePath();
    ctx.fill();

    // Head & Fangs (Animates during attack)
    ctx.save();
    ctx.translate(22, -35);
    if (hero.state === 'attacking') {
      ctx.translate(swing * 8, swing * 4); // Lunge forward
      ctx.rotate(swing * 0.2); // Bite down
    }
    
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    
    // Snout
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(18, -5);
    ctx.lineTo(15, 8);
    ctx.lineTo(0, 12);
    ctx.fill();

    // Jaw (Opens during attack)
    ctx.fillStyle = '#ffffff'; // Teeth
    const jawOpen = cast * 10;
    ctx.beginPath();
    ctx.moveTo(5, 8 + jawOpen);
    ctx.lineTo(15, 8 + jawOpen);
    ctx.lineTo(10, 2 + jawOpen);
    ctx.fill();
    
    // Top Teeth
    ctx.beginPath();
    ctx.moveTo(5, 5);
    ctx.lineTo(15, 5);
    ctx.lineTo(10, 10);
    ctx.fill();

    // Glowing Eyes
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(4, -4, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore(); // End head

    // Front Legs
    ctx.fillStyle = '#14532d';
    ctx.fillRect(-15 - walk * 12, -20, 10, 20);
    ctx.fillRect(10 - walk * 12, -20, 10, 20);
    
    // Claws
    ctx.fillStyle = '#ef4444';
    if (hero.state === 'attacking' && cast > 0) {
      // Swipe claws
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(35, -15, 12 * cast, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  static drawMalakor(ctx, hero, walk, swing, cast) {
    const hover = Math.sin((hero.animTimer || 0) * 3) * 6;
    ctx.save();
    ctx.translate(0, -hover - 10);

    // Ethereal Trail
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#312e81';
    ctx.beginPath();
    ctx.moveTo(-15, -10);
    ctx.lineTo(15, -10);
    ctx.lineTo(0 + walk * 15, 20);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Robe & Cloak
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.moveTo(0, -55);
    ctx.lineTo(-25, -10);
    ctx.lineTo(20, -10);
    ctx.closePath();
    ctx.fill();
    
    // Inner Glow Void
    const robGrad = ctx.createLinearGradient(0, -55, 0, -10);
    robGrad.addColorStop(0, 'rgba(168, 85, 247, 0)');
    robGrad.addColorStop(1, 'rgba(168, 85, 247, 0.8)');
    ctx.fillStyle = robGrad;
    ctx.beginPath();
    ctx.moveTo(0, -55);
    ctx.lineTo(-15, -10);
    ctx.lineTo(10, -10);
    ctx.fill();

    // Floating Skull Head
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, -50, 10, 0, Math.PI * 2);
    ctx.fill();

    // Void Eyes
    ctx.fillStyle = '#a855f7';
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(-4, -51, 3, 0, Math.PI * 2);
    ctx.arc(4, -51, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dark Soul Scythe (Arm)
    ctx.save();
    ctx.translate(0, -35);
    ctx.rotate(swing * 2); // Huge sweeping swing
    
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-20, 30);
    ctx.lineTo(25, -45);
    ctx.stroke();

    // Scythe Blade
    ctx.fillStyle = '#c084fc';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(28, -45, 20, Math.PI * 1.1, Math.PI * 1.6);
    ctx.lineTo(25, -45);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Dark magic burst on strike
    if (hero.state === 'attacking' && cast > 0.8) {
      ctx.fillStyle = '#d8b4fe';
      ctx.globalAlpha = cast;
      ctx.beginPath();
      ctx.arc(35, -40, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
    
    ctx.restore();

    ctx.restore();
  }

  static drawAlexander(ctx, hero, walk, swing, cast) {
    // Dynamic Cape
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(-10, -42);
    ctx.lineTo(-35, -5 + walk * 8);
    ctx.lineTo(-15, -5);
    ctx.closePath();
    ctx.fill();

    // Legs
    ctx.fillStyle = '#475569';
    ctx.fillRect(-10 + walk * 8, -18, 8, 18);
    ctx.fillRect(4 - walk * 8, -18, 8, 18);

    // Armor Body
    const armorGrad = ctx.createLinearGradient(0, -45, 0, -15);
    armorGrad.addColorStop(0, '#f8fafc');
    armorGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = armorGrad;
    ctx.fillRect(-14, -45, 26, 28);
    
    // Gold trim belt
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-14, -22, 26, 6); 
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-4, -24, 8, 10); // Belt buckle

    // Golden Pauldrons
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(-14, -45, 9, 0, Math.PI * 2);
    ctx.arc(12, -45, 9, 0, Math.PI * 2);
    ctx.fill();

    // Head & Golden Crest Helmet
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(0, -55, 11, 0, Math.PI * 2);
    ctx.fill();
    // Plume
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(-6, -55);
    ctx.lineTo(6, -55);
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -70, 6, 0, Math.PI * 2);
    ctx.fill();

    // Greatsword (Arm)
    ctx.save();
    ctx.translate(0, -35);
    ctx.rotate(swing * 2.2 - walk * 0.2);
    
    // Arm
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-4, 0, 8, 20);
    
    // Sword
    ctx.shadowColor = '#60a5fa';
    if (hero.state === 'attacking') {
      ctx.shadowBlur = cast * 30; // Glow intensifies on strike
    }
    
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-4, 20);
    ctx.lineTo(4, 20);
    ctx.lineTo(4, 65);
    ctx.lineTo(0, 75);
    ctx.lineTo(-4, 65);
    ctx.fill();
    
    // Guard
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-12, 18, 24, 6);
    
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  static renderHealthBar(ctx, hero, screenX, screenY) {
    if (hero.hp >= hero.maxHp) return;
    ctx.save();
    const barWidth = 45;
    const barHeight = 6;
    const barY = screenY - hero.height - 25;

    // Background (Gold border for heroes)
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(screenX - barWidth / 2 - 2, barY - 2, barWidth + 4, barHeight + 4);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(screenX - barWidth / 2, barY, barWidth, barHeight);

    // Fill
    const pct = Math.max(0, Math.min(1, hero.hp / hero.maxHp));
    ctx.fillStyle = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#dc2626';
    ctx.fillRect(screenX - barWidth / 2, barY, barWidth * pct, barHeight);
    ctx.restore();
  }
}
