
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }

}

export class Usuario2 {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public puesto?: string,
        public genero?: string,
        public estatus?: string
    ) { }

}

export class Usuario3 {

    constructor(
        public id: string,
        public nombre: string,
        public email: string,
        public puesto?: string,
        public genero?: string,
        public estatus?: string
    ) { }

}