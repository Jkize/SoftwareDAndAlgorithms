import { Weapon } from "./Weapon";

export class Sword extends Weapon{

    constructor(baseDamage:number, baseDurability:number, value:number, weight:number){
        super("sword", baseDamage,baseDurability,value,weight);
    }

    polish():void{
        const damage = this.damageModifier + Weapon.MODIFIER_CHANGE_RATE;
        if(damage <=this.baseDamage*0.25){
            this.damageModifier+=Weapon.MODIFIER_CHANGE_RATE;
        }
    }
}