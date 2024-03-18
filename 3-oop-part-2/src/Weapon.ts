import { Item } from "./Item";

export class Weapon extends Item{
 
    public static MODIFIER_CHANGE_RATE:number = 0.05;
    protected baseDamage:number;
    protected damageModifier:number;

    private baseDurability:number;
    protected durabilityModifier:number;
    private isBroken = false;
    
    constructor(name:string, baseDamage:number, baseDurability:number, value:number, weight:number){
        super(name,value,weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;

        this.damageModifier = 0;
        this.durabilityModifier = 0;

    }

   


    polish():void{}

    getEffectiveDamage():number{
        return this.baseDamage+this.damageModifier;
    }

    getEffectiveDurability():number;
    getEffectiveDurability(durabilityModifier:number):number;
    getEffectiveDurability(durabilityModifier?:number):number{

        if(durabilityModifier!==undefined){
            return this.baseDurability + durabilityModifier;
        }
        const sumDurability= this.baseDurability + this.durabilityModifier;
        return (sumDurability<=0)?0:sumDurability;
    }

    toString(): string {
        return super.toString()+`, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${ (100*this.getEffectiveDurability()).toFixed(2)}%`
    }


    use(): string {
        if(this.isBroken){
            return `You can't use the ${this.name}, it is broken.`;
        }

        const message = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`
       
        this.durabilityModifier-=Weapon.MODIFIER_CHANGE_RATE;
        const effectiveDurability = this.getEffectiveDurability();

        if(effectiveDurability===0){
            this.isBroken = true;
            return message+`\nThe ${this.name} breaks.`; 
        }        
        return message;
    }
 

}