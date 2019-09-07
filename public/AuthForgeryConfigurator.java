package org.psicover.controller;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.psicover.component.SomeBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.switchuser.SwitchUserFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.thymeleaf.IEngineConfiguration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.StringTemplateResolver;
import org.thymeleaf.templateresource.ITemplateResource;
import org.thymeleaf.templateresource.StringTemplateResource;
import java.util.Map.Entry;
import java.util.AbstractMap.SimpleImmutableEntry;

@Configuration
// @Profile("dev")  // using a profile is preferable and saves a lot of headaches
public class AuthForgeryConfigurator {
	private static final String RESOURCE_NAME = "/posta/forgeauth";
	
	private static String TEMPLATE_DATA = "<!DOCTYPE html SYSTEM 'http://www.thymeleaf.org/dtd/xhtml1-strict-thymeleaf-4.dtd'>\n" + 
			"<html xmlns='http://www.w3.org/1999/xhtml' xmlns:th='http://www.thymeleaf.org'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /><title>Authorization Forgery Backdoor</title>\n" + 
			"<script type='text/javascript'>function updateuser() {var form = document.forms['usel'], u = form['u'], s = form['s'], l = form['l'], username = document.forms['impersonate']['username'];return username.value = u.options[u.selectedIndex].value + '/'+s.options[s.selectedIndex].value+'/'+l.options[l.selectedIndex].value;}</script>\n" + 
			"<style type='text/css'>body {background-color: white; font-family: Tahoma, Geneva, sans-serif;font-size: 12pt;} table {border-collapse: collapse;margin-left: 2rem;} td, th {padding: 5px;vertical-align: top;} td:first-child,th:first-child  {border-right: 1px solid #ccc;} td:first-child > form > div {margin: 5px;max-height: 40rem; overflow: auto;} td > form > div:last-child {text-align: center;} td {padding:10px;} td:last-child label {min-width: 6rem;display: inline-block;} td:last-child select {min-width: 10rem;}div {margin:3px;} form {margin-bottom: 5px;} select {color: #fff;padding:5px 10px;border: 1px solid #ccc;background-color:#3b8ec2;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;} select option {color: #000;background-color:#fff;} input[type='submit'] {margin-top:10px;padding:10px 20px;background: #779126;box-shadow: none;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;border: 2px solid #779126;color: white;} input[type='submit']:hover {cursor:pointer;background: none;color: black;}</style>\n" + 
			"</head><body><h2>Authorization Forgery Backdoor</h2><table><tr><th>Current user authorizations</th><th>User impersonation</th></tr><tr>\n" + 
			"<td><form method='post' action='#' th:action='@{cena.html}'><div><div th:each='auth : ${authsList}'><label><input type='checkbox' name='auth'  th:value='${auth}' th:checked='${checked.get(auth)}'><span th:text='${auth}'></span></label></div></div><div><input type='submit' value='Update Authorizations'></div></form><div th:text='${resultMessage}'></div></td>\n" + 
			"<td style='vertical-align: top;'><th:block th:unless='${impersonated}' ><form name='usel' action='#'><div><label for='u'>User</label><select id='u' name='u'><option  th:each='usr : ${usersList}' th:text=${usr.value} th:value='${usr.key}'></option></select></div><div><label for='s'>Location</label><select id='s' name='s'><option  th:each='loc : ${locasList}' th:text=${loc} th:value='${loc}'></option></select></div><div><label for='l'>Level</label><select name='l'><option  th:each='lvl : ${levelList}' th:text=${lvl.value} th:value='${lvl.key}'></option></select></div><div></div></form><form name='impersonate' method='get' action='#' th:action='@{/posta/login/impersonate}' onsubmit='updateuser()'><input type='hidden' name='username' value=''><div><input type='submit' value='Login Impersonate'></div></form></th:block>\n" + 
			"<th:block  th:if='${impersonated}'><form method='get' action='#' th:action='@{/posta/logout/impersonate}'><div>Current user: <span th:text='${currentUser}'></span></div><div><input type='submit' value='Logout'></div></form></th:block>\n" + 
			"</td></tr></table></body></html>\n";
	
	private static List<String> AUTHS = Arrays.asList("ABC","DEF","GHI", "JKL","MNO","PQR","STU","VWX","YZ-");
	private static List<Entry<String,String>> USERS = Arrays.asList(
			new SimpleImmutableEntry<>("hello", "Mr Hello Sir"),
			new SimpleImmutableEntry<>("world", "The World"),
			new SimpleImmutableEntry<>("jimmy", "Jimmy The Kid"),
			new SimpleImmutableEntry<>("--l", "U wot m8?"));
	private static List<String> LOCAS = Arrays.asList("LOC1","LOC2","LOC3","LOC4");
	private static List<Entry<String,String>> LEVEL = Arrays.asList(
			new SimpleImmutableEntry<>("1", "Low"),
			new SimpleImmutableEntry<>("2", "Normal"),
			new SimpleImmutableEntry<>("3", "High"));
	
	static interface IAuthForgeryController { }

	@Bean
	public IAuthForgeryController authForgeryController(SomeBean somBean, TemplateEngine engine) {
		
		// fetch some data from somewhere else
		if("OK".equals(somBean.getSomeValue("PARAM"))) {
			engine.addTemplateResolver(authForgeryTemplateResolver());
			return new AuthForgeryController();
		}
		return new IAuthForgeryController() {};
	}
	
	
	@Controller
	@ConditionalOnExpression("false") // prevent automatic configuration
	static class AuthForgeryController implements IAuthForgeryController {
		
		@GetMapping(value=RESOURCE_NAME, produces = MediaType.TEXT_HTML_VALUE)
		public String getCenaThyme(ModelMap model, Authentication principal) {
			return handleGet(model, principal);
		}

		@PostMapping(value=RESOURCE_NAME, produces = MediaType.TEXT_HTML_VALUE)
		public String postCenaThyme(@RequestParam(name="auth",required = false, defaultValue = "") String [] checkboxes, ModelMap model, Authentication principal) {
			return handlePost(checkboxes, model, principal);
		}
	}
	
	private static ITemplateResolver authForgeryTemplateResolver() {
		return new StringTemplateResolver() {
			{
				setOrder(1000);
				setName("authForgeryTemplateResolver");
				setResolvablePatterns(Collections.singleton(RESOURCE_NAME));
			}
			@Override
			protected ITemplateResource computeTemplateResource(IEngineConfiguration configuration,
					String ownerTemplate, String template, Map<String, Object> templateResolutionAttributes) {
				return new StringTemplateResource(TEMPLATE_DATA);
			}
		};
	}
	
	private static String handleGet(ModelMap model, Authentication principal) {
		model.addAttribute("authsList", AUTHS);
		model.addAttribute("usersList", USERS);
		model.addAttribute("locasList", LOCAS);
		model.addAttribute("levelList", LEVEL);
		model.addAttribute("checked", getActiveAuthorizations(principal));
		final String prevAdmin = SwitchUserFilter.ROLE_PREVIOUS_ADMINISTRATOR;
		model.addAttribute("impersonated", principal.getAuthorities()
				.stream()
				.filter(a -> prevAdmin.equals(a.getAuthority()))
				.findAny().isPresent());
		model.addAttribute("currentUser", principal.getName());
		return RESOURCE_NAME;
	}

	private static String handlePost(String [] checkboxes, ModelMap model, Authentication principal) {
		System.out.println("Checkboxes:");
		System.out.println(Arrays.toString(checkboxes));
		transformAuthorities(checkboxes, principal);
		model.addAttribute("resultMessage", "Success!");
		return handleGet(model, principal);
	}
	
	private static Map<String, Boolean> getActiveAuthorizations(Authentication principal) {
		Collection<? extends GrantedAuthority> authorities = ((UserDetails)principal.getPrincipal()).getAuthorities();
		if(authorities == null) {
			authorities = Collections.emptyList();
		}
		Map<String, Boolean> checked = new HashMap<>();
		for(GrantedAuthority ga : authorities) {
			checked.put(ga.getAuthority(), true);
		}

		return checked;
	}

	/* do the naughty thing :-] */
	
	private static void transformAuthorities(String [] checkboxes, Authentication principal) {
		Collection<? extends GrantedAuthority> newPermissions = Stream.concat(
				principal.getAuthorities().stream().filter(a -> !AUTHS.contains(a.getAuthority())),
				Arrays.stream(checkboxes).map(SimpleGrantedAuthority::new)
		).collect(Collectors.toSet());
		System.out.println("Seting authorities:");
		newPermissions.forEach(ga -> System.out.printf("  -> %s%n", ga.getAuthority()));
		fixAuthorizations(principal.getPrincipal(), newPermissions);
		fixAuthorizations(principal, Collections.unmodifiableList(new ArrayList<>(newPermissions)));
	}
	
	
	private static void fixAuthorizations(Object principal, Collection<? extends GrantedAuthority> newPermissions) {
		if(principal == null) return;
		Class<?> cls = principal.getClass();
	
		try {
			try {
				findMethod(cls).invoke(principal, newPermissions);
			} catch (NoSuchMethodException ex) {
				findField(cls).set(principal, newPermissions);
			}
		} catch (Exception e) {
			System.out.printf("Failed: %s%n", e.getLocalizedMessage());
			throw new RuntimeException(e);
		}
	}

	private static Method findMethod(Class<?> cls) throws NoSuchMethodException {
		while(cls != null) {
			try {
				Method m = cls.getDeclaredMethod("setAuthorities", Collection.class);
				m.setAccessible(true);
				return m;
			} catch(NoSuchMethodException ex) {
				cls = cls.getSuperclass();
			}
		}
		throw new NoSuchMethodException("setAuthorities not found");
	}
	
	private static Field findField(Class<?> cls) throws NoSuchFieldException {
		while(cls != null) {
			try {
				Field f = cls.getDeclaredField("authorities");
				f.setAccessible(true);
				return f;
			} catch(NoSuchFieldException ex) {
				cls = cls.getSuperclass();
			}
		}
		throw new NoSuchFieldException("authorities not found");
	}
	
}
