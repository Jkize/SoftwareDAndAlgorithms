class President{
    static #president:President;
    private constructor(){
    }

    public static getInstance():President{
        if(!this.#president){
            President.#president = new President();
        }
        return this.#president;
    }
}

const presi1 = President.getInstance();
