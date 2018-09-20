//https://www.shadertoy.com/view/XtyyWy

float in_circle(float in_c, vec2 uv, float radius) {
    return 1.-pow(smoothstep(0.,radius, length(uv)),47.);
}

float in_ring(float in_c, vec2 uv, float r1, float r2) {
    float len = length(uv);
    return (1.0 - step(r1, len)) * step(r2, len);
    //return smoothstep(r2, r1, len);
}

float lighting(float in_c, vec2 uv, float radius) {
    return 1.-smoothstep(0., radius, length(uv));
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord/iResolution.xy * 2.) - 1.;
    
    uv.x *= iResolution.x/iResolution.y;
    
    uv.x += 0.02 * sin(iTime*5. + uv.x * 15. * cos(iTime + uv.x));
 	uv.y += 0.02 * cos(iTime*5. + uv.y * 25. * cos(iTime + uv.x));
        
    vec3 col = vec3(0,1,1);
    
    float in_c = in_ring(0., uv, .5, .45);
    float in_c2 = in_circle(0., uv, 0.46);
    
    float r = 0.5 + (sin(iTime + uv.x * 5.) + 1.)/2. * 0.5;
    float g = 0.25 + (sin(iTime + uv.y * 16.) + 1.)/2. * 0.4;
    float b = 0.3 + (sin(iTime + 2.*uv.x) + 1.)/2. * 0.5;
    vec3 col2 = vec3(r,g,b);

    
    float lighting = lighting(0., uv, 1.5);
    
    // Output to screen
    fragColor = vec4(col,1.0) * (in_c) + (vec4(col2,1.) * in_c2) + vec4(col2,1.) * lighting;
}