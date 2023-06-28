import { browser } from '$app/environment';
import { Auth } from './keycloak';

export default class Registry {
	public static auth = browser ? new Auth() : null;
}
