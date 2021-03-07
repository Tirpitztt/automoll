package com.example.tehnomoll.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	final DataSource dataSource;

	@Value("${spring.admin.username}")
	private String adminUsername;

	@Value("${spring.admin.username}")
	private String adminPassword;

	@Value("${spring.queries.users-query}")
	private String usersQuery;

	@Value("${spring.queries.roles-query}")
	private String rolesQuery;

	@Autowired
	public SecurityConfig(DataSource dataSource) {

		this.dataSource = dataSource;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// auth.inMemoryAuthentication().withUser(adminUsername).password(adminPassword).roles("user");
		auth.inMemoryAuthentication().withUser("user")
				.password("{bcrypt}$2a$10$U2lwVHhpkg/U4qaZkr/1gu0vfH3gZKDh8.pGc.Ovwb7X1MkTtjiVG").roles("user");
		auth.jdbcAuthentication().usersByUsernameQuery(usersQuery).authoritiesByUsernameQuery(rolesQuery)
				.dataSource(dataSource).passwordEncoder(delegatingPasswordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
		//.requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
				.antMatchers("/", "/registration","/save", "/js/**", "/css/**", "/img/**", "/webjars/**", "/fonts/**")
				.permitAll().antMatchers("/adminka","/refbook").hasRole("ADMIN").anyRequest().authenticated().and().formLogin()
				.permitAll().and().logout().permitAll();

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
	}

	@Bean
	public PasswordEncoder delegatingPasswordEncoder() {
		PasswordEncoder defaultEncoder = new StandardPasswordEncoder();
		Map<String, PasswordEncoder> encoders = new HashMap<>();
		encoders.put("bcrypt", new BCryptPasswordEncoder());
		encoders.put("scrypt", new SCryptPasswordEncoder());

		DelegatingPasswordEncoder passworEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
		passworEncoder.setDefaultPasswordEncoderForMatches(defaultEncoder);

		return passworEncoder;
	}

}
