//https://www.shadertoy.com/view/MlGcWy

float in_square(vec2 uv, float width, float height) {
    
    return (1.-step(width, abs(uv.x))) * (1.-step(height, abs(uv.y)));
}

float in_sub_square(float in_s, vec2 uv, float width, float height) {
    float centerCloseness = 1.-smoothstep(0., 1., max(0.,width - abs(uv.x))/(width)) * smoothstep(0., 1., max(0.,height - abs(uv.y))/(height));
    return in_s * (1.-pow(centerCloseness, 250.));
}

float lighting(float in_c, vec2 uv, float radius) {
    return 1.-smoothstep(0., radius, length(uv));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy * 2. - 1. ;
    uv.x *= iResolution.x/iResolution.y;
    
    //uv.x += 0.01 * sin(iTime*5. + uv.x * 25. * cos(iTime + uv.y));
 	//uv.y += 0.01 * cos(iTime*5. + uv.y * 25. * cos(iTime + uv.x));    
    
    float width = 0.5 + 0.02 * sin(iTime*5. + uv.x * 25. * cos(iTime + uv.y));
    float height = 0.5 + 0.02 * cos(iTime*5. + uv.y * 25. * cos(iTime + uv.x));   
    
    float in_s = in_square(uv, width, height);
    float in_ss = in_sub_square(in_s, uv, width - 0.05, height - 0.05);
    
    float on_border = float(in_ss <= 0.0005);

	vec3 col = vec3(1);
    float r = 0.5 + (sin(iTime + uv.x * 5.) + 1.)/2. * 0.5;
    float g = 0.25 + (sin(iTime + uv.y * 16.) + 1.)/2. * 0.4;
    float b = 0.3 + (sin(iTime + 2.*uv.x) + 1.)/2. * 0.5;
    vec3 col2 = vec3(r,g,b);
    
    float light = lighting(0., uv, 1.5);
    
    
    fragColor = vec4(col,1.0) * in_s * on_border + vec4(col2, 1.) * in_ss * (1.-on_border) + vec4(col2, 1.) * light;
}