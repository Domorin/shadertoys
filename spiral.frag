#define PI 3.141592653589

float in_angle_range(float a, float a1, float a2) {
    a1 = mod(a1, PI * 2.);
    a2 = mod(a2, PI * 2.);
       
    float f1 = a - a1;
    float f2 = a2 - a1;
    if(f1 < .0) {
        f1 += 2. * PI;
    }
    if(f2 < 0.) {
        f2 += 2. * PI;
    }
    
    return 1.-step(f2, f1);    
    
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord/iResolution.xy * 2.) - 1.;
    
    
    //(sqrt(2)) i.e. max length(uv) can be
    float R = 1.41421356237;
    
    // sin(iTime) makes it zoom in and shit its funky as fuck
    float r = length(uv) * sin(iTime/2.);
    float b = 0.5 + abs(r/R) * (PI-0.5);
    float a = atan(uv.y, uv.x) + PI * iTime * 5.;
    
    //r/f = a (equation of a spiral)
    float desired_angle = mod(r/0.025, 2.*PI);
    
    // See if the desired angle is within the current angle (a)
    float result = in_angle_range(desired_angle, a-b, a+b);   
    fragColor = (vec4(0,0,1,1) * (1.-abs(r/R)) + (abs((r/R)) * vec4(0,1,0,1))) * result + vec4(.25,0,.5,1) * (1.-result);   
    
}