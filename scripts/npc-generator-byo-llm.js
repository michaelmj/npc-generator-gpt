import { npcGenBYOLLMSettings } from "./module/settings.js";
import { npcGenBYOLLMGenerateNPC } from "./module/generateNPC.js";
import { npcGenBYOLLMEnhanceNPC } from "./module/enhanceNPC.js";

Hooks.once('ready', () => {
    console.log("NPC Generator (GPT) | Initializing Settings")
    new npcGenBYOLLMSettings();
});

Hooks.on("renderActorDirectory", async (app, html) => {
    if (game.user.isGM && app instanceof ActorDirectory) {
        let button = $(`<button class='npc-generator-byo-llm'><i class='fas fa-address-card'></i> ${game.i18n.localize("npc-generator-byo-llm.button")}</button>`)

        button.click(function () {
            new npcGenBYOLLMGenerateNPC().render(true)
        });

        html.find(".directory-header .header-actions").append(button);
    }
});

Hooks.on("getActorSheetHeaderButtons", async (app, buttons) => {
    if (game.user.isGM && app.object.type === 'npc') {
        buttons.unshift({
            label: 'NGG',
            class: 'npc-generator-byo-llm',
            icon: 'fa-light fa-atom',
            onclick: ev => { new npcGenBYOLLMEnhanceNPC(app.object).render(true) }
        });
    }
});
