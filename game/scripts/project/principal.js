const BOSS_NAME = "Boss";
const TEXT_NAME = "txt_bossvida";

globalThis.bossData = {
  vida: 2,
  vivo: true,
  tMove: 0,
  moveInterval: 0.9
};

globalThis.iniciarBoss = function () {
  bossData.vida = 2;
  bossData.vivo = true;
  bossData.tMove = 0;
};

globalThis.acertarBoss = function (runtime) {
  if (!bossData.vivo) return;

  bossData.vida--;

  const txt = runtime.objects[TEXT_NAME]?.getFirstInstance();
  if (txt) txt.text = "VIDA DO BOSS: " + bossData.vida;

  if (bossData.vida <= 0) {
    bossData.vivo = false;

    const boss = runtime.objects[BOSS_NAME]?.getFirstInstance();
    if (boss) boss.destroy();

    if (txt) txt.text = "VOCÊ INSTAUROU A PAZ NA HUMANIDADE";
  }
};

globalThis.atualizarBoss = function (runtime, dt) {
  if (!bossData.vivo) return;

  const boss = runtime.objects[BOSS_NAME]?.getFirstInstance();
  if (!boss) return;

  const txt = runtime.objects[TEXT_NAME]?.getFirstInstance();
  if (txt) txt.text = "VIDA DO BOSS: " + bossData.vida;

  bossData.tMove += dt;
  if (bossData.tMove >= bossData.moveInterval) {
    bossData.tMove = 0;

    const x = Math.random() * (280 - 40) + 40;
    const y = Math.random() * (90 - 20) + 20;

    boss.behaviors.MoverPara.moveToPosition(x, y);
  }
};