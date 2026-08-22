export class WikiModal {
  constructor(engine) {
    this.engine = engine;
    this.modal = document.getElementById('screen-wiki');
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.btnOpenWikiMenu = document.getElementById('btn-open-wiki-menu');
    this.btnOpenWikiHud = document.getElementById('btn-open-wiki-hud');
    this.btnOpenWikiPause = document.getElementById('btn-open-wiki-pause');
    this.btnCloseWiki = document.getElementById('btn-close-wiki');
    this.wikiTabButtons = document.querySelectorAll('.wiki-tab-btn');
    this.wikiSections = document.querySelectorAll('.wiki-section');
  }

  bindEvents() {
    if (this.btnOpenWikiMenu) {
      this.btnOpenWikiMenu.addEventListener('click', () => this.open());
    }
    if (this.btnOpenWikiHud) {
      this.btnOpenWikiHud.addEventListener('click', () => this.open());
    }
    if (this.btnOpenWikiPause) {
      this.btnOpenWikiPause.addEventListener('click', () => this.open());
    }
    if (this.btnCloseWiki) {
      this.btnCloseWiki.addEventListener('click', () => this.close());
    }

    this.wikiTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.wikiTab;
        this.switchTab(targetTab);
        this.engine.sound.playSfx('click');
      });
    });
  }

  open() {
    if (this.modal) {
      this.modal.classList.remove('hidden');
      this.engine.sound.playSfx('click');
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.add('hidden');
      this.engine.sound.playSfx('click');
    }
  }

  toggle() {
    if (this.modal) {
      if (this.modal.classList.contains('hidden')) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  switchTab(tabName) {
    this.wikiTabButtons.forEach(b => b.classList.toggle('active', b.dataset.wikiTab === tabName));
    this.wikiSections.forEach(s => s.classList.toggle('active', s.id === `wiki-tab-${tabName}`));
  }
}
