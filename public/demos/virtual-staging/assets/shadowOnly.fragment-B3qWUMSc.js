import{S as e}from"./index-M4ZXO7HX.js";import{s as t}from"./sceneFragmentDeclaration-CZ_sD_za.js";import{s as l}from"./sceneUboDeclaration--6jciPJT.js";import{h as s}from"./helperFunctions-M4eN6w60.js";import{l as c,a as m}from"./lightUboDeclaration-DMOByrHH.js";import{l as g}from"./lightsFragmentFunctions-7WWQzvFb.js";import{s as d}from"./shadowsFragmentFunctions-BDwTvtdM.js";import{c as f,a as h}from"./clipPlaneFragment-CaT4mQ1B.js";import{l as p}from"./logDepthDeclaration-DLFdB3DC.js";import{f as F,a as u}from"./fogFragment-D8ga_89w.js";import{l as S}from"./lightFragment-BUMvz4jE.js";import{l as v}from"./logDepthFragment-CRoQgKiI.js";const a="imageProcessingCompatibility",n=`#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;e.IncludesShadersStore[a]||(e.IncludesShadersStore[a]=n);const _={name:a,shader:n},i="shadowOnlyPixelShader",r=`precision highp float;
#include<__decl__sceneFragment>
uniform float alpha;uniform vec3 shadowColor;varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying float vViewDepth;
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#include<lightFragment>[0..1]
vec4 color=vec4(shadowColor,(1.0-clamp(shadow,0.,1.))*alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;e.ShadersStore[i]||(e.ShadersStore[i]=r);const D=[t,l,s,c,m,g,d,f,p,F,h,S,v,u,_];for(const o of D)e.IncludesShadersStore[o.name]||(e.IncludesShadersStore[o.name]=o.shader);const L={name:i,shader:r};export{L as shadowOnlyPixelShader};
