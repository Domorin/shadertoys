float in_square(vec2 uv, float square_size)
{
    float a = iTime;
    float s = sin(a);
    float c = cos(a);
    
    uv = mat2(c, -s, s, c);
    
    return float(uv.x  -square_size && uv.x  square_size && uv.y  -square_size && uv.y  square_size);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoordiResolution.xy);
    vec3 color = vec3(0.0,0.0,1);
    
    uv = uv  2.0 - 1.0;
    uv.x = iResolution.x  iResolution.y;
    
    
    float ratio = iResolution.x  iResolution.y;
    
    uv = 3.0;
    
    float a = iTime  0.4 + length(uv)  0.25  sin(iTime  0.25);
    float s = sin(a);
    float c = cos(a);
    
    uv = mat2(c, -s, s, c);
    
    vec2 guv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    float square_size = 1.0 + (sin(iTime  0.623) + 1.0)  0.5  length(uv)  0.25;    
    
    
    
    float square = 0.0;
    for(float col = -1.0; col  2.0; col += 1.0)
    {
        for(float row = -1.0; row  2.0; row += 1.0)
        {            
            square += in_square(vec2(guv.x + col, guv.y + row), square_size);
        }
        
    }
    
    if(mod(square, 2.0) == 0.0) square = 4.0;   
    
    
	vec3 col = mix(color, vec3(1.0), square  9.0);    
    fragColor = vec4(col, 1.0);
}