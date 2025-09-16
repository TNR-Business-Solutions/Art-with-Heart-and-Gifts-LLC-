/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#blog1": $w.IFrame;
	"#section4": $w.HiddenCollapsedElement;
	"#section5": $w.HiddenCollapsedElement;
	"#text3": $w.Text;
	"#page1": $w.Page;
}