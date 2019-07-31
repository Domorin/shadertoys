float circle(vec2 uv)
{
    return float(length(uv) <= 1.0);
}

vec3 normal(vec2 uv)
{
    return vec3(uv.x, uv.y, (1.0 - length(uv)) * 2.0);
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy * 2.0 - 1.0;
    uv.x *= iResolution.x/iResolution.y;

    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));


    float x = 0.0 + sin(iTime) * 2.5;
    float y = 2.5;
    float z = 0.0 + cos(iTime) * 2.5;



    vec3 pixel_normal = normalize(normal(uv));

    vec3 light_source = normalize(vec3(x, y, z));

    float light = max(dot(pixel_normal, light_source), 0.0);


	//col *= light; 

    col = mix(vec3(0.0, 0.0, 0.0), col, light * 1.25);


    // Output to screen
    fragColor = vec4(col,1.0) * circle(uv);
}