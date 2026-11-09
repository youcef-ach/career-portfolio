import{S as a}from"./index-M4ZXO7HX.js";import{c as t,a as l}from"./clipPlaneFragment-CaT4mQ1B.js";import{l as c}from"./logDepthDeclaration-DLFdB3DC.js";import{f as g,a as s}from"./fogFragment-D8ga_89w.js";import{p as d}from"./packingFunctions-DhmFQHrZ.js";import{l as f}from"./logDepthFragment-CRoQgKiI.js";const n="gaussianSplattingFragmentDeclaration",i=`vec4 gaussianColor(vec4 inColor)
{float A=-dot(vPosition,vPosition);if (A<-4.0) discard;float B=exp(A)*inColor.a;
#include<logDepthFragment>
vec3 color=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4(color,B);}
`;a.IncludesShadersStore[n]||(a.IncludesShadersStore[n]=i);const m={name:n,shader:i},o="gaussianSplattingPixelShader",r=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#ifdef GPUPICKER_DEPTH
layout(location=0) out highp vec4 glFragData[2];
#endif
#ifdef GPUPICKER_PACK_DEPTH
#include<packingFunctions>
#endif
varying vec4 vColor;varying vec2 vPosition;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
void main () {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec4 finalColor=gaussianColor(vColor);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef GPUPICKER_DEPTH
glFragData[0]=finalColor;
#ifdef GPUPICKER_PACK_DEPTH
glFragData[1]=pack(gl_FragCoord.z);
#else
glFragData[1]=vec4(gl_FragCoord.z,0.0,0.0,1.0);
#endif
#else
gl_FragColor=finalColor;
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}
`;a.ShadersStore[o]||(a.ShadersStore[o]=r);const F=[t,c,g,d,f,s,m,l];for(const e of F)a.IncludesShadersStore[e.name]||(a.IncludesShadersStore[e.name]=e.shader);const _={name:o,shader:r};export{_ as gaussianSplattingPixelShader};
