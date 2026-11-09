import{S as e}from"./index-M4ZXO7HX.js";import{s as r}from"./sceneUboDeclaration-CyG7FrDt.js";import{h as i}from"./helperFunctions-aDlu3GsM.js";import{l as t,s as l}from"./shadowsFragmentFunctions-DB71rSix.js";import{l as s}from"./lightsFragmentFunctions-u6-WXk0Z.js";import{c,a as f}from"./clipPlaneFragment-DAE64roJ.js";import{l as m}from"./logDepthDeclaration-7OLRW07_.js";import{f as g,a as d}from"./fogFragment-wLDtpurn.js";import{l as S}from"./lightFragment-DuyIsuJA.js";import{l as h}from"./logDepthFragment-DtQAqPd9.js";const n="shadowOnlyPixelShader",o=`#include<sceneUboDeclaration>
uniform alpha: f32;uniform shadowColor: vec3f;varying vPositionW: vec3f;
#ifdef NORMAL
varying vNormalW: vec3f;
#endif
#include<helperFunctions>
#include<lightUboDeclaration>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying vViewDepth: f32;
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
var viewDirectionW: vec3f=normalize(scene.vEyePosition.xyz-fragmentInputs.vPositionW);
#ifdef NORMAL
var normalW: vec3f=normalize(fragmentInputs.vNormalW);
#else
var normalW: vec3f= vec3f(1.0,1.0,1.0);
#endif
var diffuseBase: vec3f= vec3f(0.,0.,0.);var info: lightingInfo;var shadow: f32=1.;var glossiness: f32=0.;var aggShadow: f32=0.;var numLights: f32=0.;
#include<lightFragment>[0..1]
var color: vec4f= vec4f(uniforms.shadowColor,(1.0-clamp(shadow,0.,1.))*uniforms.alpha);
#include<logDepthFragment>
#include<fogFragment>
fragmentOutputs.color=color;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;e.ShadersStoreWGSL[n]||(e.ShadersStoreWGSL[n]=o);const u=[r,i,t,s,l,c,m,g,f,S,h,d];for(const a of u)e.IncludesShadersStoreWGSL[a.name]||(e.IncludesShadersStoreWGSL[a.name]=a.shader);const w={name:n,shader:o};export{w as shadowOnlyPixelShaderWGSL};
