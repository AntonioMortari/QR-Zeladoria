
import { ReactNode } from 'react';

export interface IHandleLoginProps {
    login: string;
    senha: string;
}  // -> Tipagem dos parâmetros da função handleLogin

export interface AuthData{
    isAuth: boolean; // -> booleano que indica se o usuário está autenticado
    usuario: IUsuario; // -> dados do usuário
    token: string; // -> token JWT
    matricula: string; // -> número da matrícula do usuário logado
} // -> Dados de autenticação do usuário

export interface IAuthContextProps {
    authData?: AuthData;  // -> Dados de autenticação do usuário
    handleLogin: ({ login, senha }: IHandleLoginProps) => void; // -> função que retorna um token JWT e os dados do usuário
    handleLogout: () => void; // -> função que limpa o armazenamento local e os dados do usuário
    problemasSelecionados: IProblemasSelecionados[]; // Problemas selecionados pelo usuário na tela AmbienteSala
    setProblemasSelecionados: (newProblemasSelecionados: IProblemasSelecionados[]) => void; // função para atualizar os problemas selecionados
} // -> Props para o contexto de autenticação.

export interface IAuthContextProviderProps {
    children: ReactNode;
}

export interface IUsuario {
    dn: string;
    userPrincipalName: string;
    sAMAccountName: string;
    mail: string;
    whenCreated: string;
    pwdLastSet: string;
    userAccountControl: string;
    givenName: string;
    cn: string;
    displayName:string;
    description: string;
    groups: string[] | any;
} // -> Tipagem para os dados do usuário

export interface IProblemasSelecionados {
    itemId: string; // id do item com problema
    itemNome: string; // nome do item com problema
    problemas: IProblema[]; // array de problemas selecionados
}

export interface IProblema{
    id: string; // id do problema selecionado
    nome: string; // nome do problema selecionado
}