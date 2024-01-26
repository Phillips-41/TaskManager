package com.in28minutes.rest.webservices.restfulwebservices.basic;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

//@Configuration
//@EnableWebSecurity
public class BasicAuthenticationSecurityConfiguration {



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors();
        http
                .authorizeHttpRequests(
                        auth ->
                                auth
                                        .antMatchers(HttpMethod.OPTIONS,"**").permitAll()
                                        .antMatchers("/h2-console/**").permitAll()
                                        .mvcMatchers("/api/posts/").permitAll()
                                        .anyRequest().authenticated());
        http.httpBasic(Customizer.withDefaults());
        http .sessionManagement(
                session -> session.sessionCreationPolicy
                        (SessionCreationPolicy.STATELESS));
         //http.csrf(csrf -> csrf.disable());
         http.csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }

}