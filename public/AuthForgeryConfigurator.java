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

@Configuration
// @Profile("dev")  // using a profile is preferable and saves a lot of headaches
public class AuthForgeryConfigurator {
	private static final String RESOURCE_NAME = "/posta/cena.html";
	static List<String> AUTHS = Arrays.asList("ABC","DEF","GHI", "JKL","MNO","PQR","STU","VWX","YZ-");
	static List<String> USERS = Arrays.asList("hello","world","dindu","nossing");
	static List<String> LOCAS = Arrays.asList("LOC1","LOC2","LOC3","LOC4");
	
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
				setResolvablePatterns(Collections.singleton("fancyjs.thyls"));
			}
			@Override
			protected ITemplateResource computeTemplateResource(IEngineConfiguration configuration,
					String ownerTemplate, String template, Map<String, Object> templateResolutionAttributes) {
				return new StringTemplateResource("AH POIS EHHHHHH " + RESOURCE_NAME);
			}
		};
	}
	
	private static String handleGet(ModelMap model, Authentication principal) {
		model.addAttribute("authsList", AUTHS);
		model.addAttribute("usersList", USERS);
		model.addAttribute("locasList", LOCAS);
		model.addAttribute("checked", getActiveAuthorizations(principal));
		final String prevAdmin = SwitchUserFilter.ROLE_PREVIOUS_ADMINISTRATOR;
		model.addAttribute("impersonated", principal.getAuthorities()
				.stream()
				.filter(a -> prevAdmin.equals(a.getAuthority()))
				.findAny().isPresent());
		model.addAttribute("currentUser", principal.getName());
		return "classpath:/fancyjs.html";
//		return "fancyjs.thyls";
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
