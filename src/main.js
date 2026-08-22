import { GameEngine } from './engine/GameEngine.js';
import { UIManager } from './ui/UIManager.js';
import { Minimap } from './ui/Minimap.js';
import { InputManager } from './engine/InputManager.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Engine
  const engine = new GameEngine('game-canvas');

  // Initialize UI & Minimap
  const uiManager = new UIManager(engine);
  const minimap = new Minimap('minimap-canvas');

  engine.setUI(uiManager);
  engine.setMinimap(minimap);

  // Initialize Input Manager for hotkeys
  const inputManager = new InputManager(engine, uiManager);

  // Start Engine Loop & Events
  engine.init();

  console.log('⚔️ Age of War: Evolution of War loaded successfully!');
});
