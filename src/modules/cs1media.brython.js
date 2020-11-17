__BRYTHON__.use_VFS = true;
var scripts = {"$timestamp": 1605621562129, "cs1media.color": [".py", "class Color(object):\n aliceblue=(240,248,255)\n antiquewhite=(250,235,215)\n aqua=(0,255,255)\n aquamarine=(127,255,212)\n azure=(240,255,255)\n beige=(245,245,220)\n bisque=(255,228,196)\n black=(0,0,0)\n blanchedalmond=(255,235,205)\n blue=(0,0,255)\n blueviolet=(138,43,226)\n brown=(165,42,42)\n burlywood=(222,184,135)\n cadetblue=(95,158,160)\n chartreuse=(127,255,0)\n chocolate=(210,105,30)\n coral=(255,127,80)\n cornflowerblue=(100,149,237)\n cornsilk=(255,248,220)\n crimson=(220,20,60)\n cyan=(0,255,255)\n darkblue=(0,0,139)\n darkcyan=(0,139,139)\n darkgoldenrod=(184,134,11)\n darkgray=(169,169,169)\n darkgreen=(0,100,0)\n darkkhaki=(189,183,107)\n darkmagenta=(139,0,139)\n darkolivegreen=(85,107,47)\n darkorange=(255,140,0)\n darkorchid=(153,50,204)\n darkred=(139,0,0)\n darksalmon=(233,150,122)\n darkseagreen=(143,188,143)\n darkslateblue=(72,61,139)\n darkslategray=(47,79,79)\n darkturquoise=(0,206,209)\n darkviolet=(148,0,211)\n deeppink=(255,20,147)\n deepskyblue=(0,191,255)\n dimgray=(105,105,105)\n dodgerblue=(30,144,255)\n firebrick=(178,34,34)\n floralwhite=(255,250,240)\n forestgreen=(34,139,34)\n fuchsia=(255,0,255)\n gainsboro=(220,220,220)\n ghostwhite=(248,248,255)\n gold=(255,215,0)\n goldenrod=(218,165,32)\n gray=(128,128,128)\n green=(0,128,0)\n greenyellow=(173,255,47)\n honeydew=(240,255,240)\n hotpink=(255,105,180)\n indianred=(205,92,92)\n indigo=(75,0,130)\n ivory=(255,255,240)\n khaki=(240,230,140)\n lavender=(230,230,250)\n lavenderblush=(255,240,245)\n lawngreen=(124,252,0)\n lemonchiffon=(255,250,205)\n lightblue=(173,216,230)\n lightcoral=(240,128,128)\n lightcyan=(224,255,255)\n lightgoldenrodyellow=(250,250,210)\n lightgreen=(144,238,144)\n lightgrey=(211,211,211)\n lightpink=(255,182,193)\n lightsalmon=(255,160,122)\n lightseagreen=(32,178,170)\n lightskyblue=(135,206,250)\n lightslategray=(119,136,153)\n lightsteelblue=(176,196,222)\n lightyellow=(255,255,224)\n lime=(0,255,0)\n limegreen=(50,205,50)\n linen=(250,240,230)\n magenta=(255,0,255)\n maroon=(128,0,0)\n mediumaquamarine=(102,205,170)\n mediumblue=(0,0,205)\n mediumorchid=(186,85,211)\n mediumpurple=(147,112,219)\n mediumseagreen=(60,179,113)\n mediumslateblue=(123,104,238)\n mediumspringgreen=(0,250,154)\n mediumturquoise=(72,209,204)\n mediumvioletred=(199,21,133)\n midnightblue=(25,25,112)\n mintcream=(245,255,250)\n mistyrose=(255,228,225)\n moccasin=(255,228,181)\n navajowhite=(255,222,173)\n navy=(0,0,128)\n oldlace=(253,245,230)\n olive=(128,128,0)\n olivedrab=(107,142,35)\n orange=(255,165,0)\n orangered=(255,69,0)\n orchid=(218,112,214)\n palegoldenrod=(238,232,170)\n palegreen=(152,251,152)\n paleturquoise=(175,238,238)\n palevioletred=(219,112,147)\n papayawhip=(255,239,213)\n peachpuff=(255,218,185)\n peru=(205,133,63)\n pink=(255,192,203)\n plum=(221,160,221)\n powderblue=(176,224,230)\n purple=(128,0,128)\n red=(255,0,0)\n rosybrown=(188,143,143)\n royalblue=(65,105,225)\n saddlebrown=(139,69,19)\n salmon=(250,128,114)\n sandybrown=(244,164,96)\n seagreen=(46,139,87)\n seashell=(255,245,238)\n sienna=(160,82,45)\n silver=(192,192,192)\n skyblue=(135,206,235)\n slateblue=(106,90,205)\n slategray=(112,128,144)\n snow=(255,250,250)\n springgreen=(0,255,127)\n steelblue=(70,130,180)\n tan=(210,180,140)\n teal=(0,128,128)\n thistle=(216,191,216)\n tomato=(255,99,71)\n turquoise=(64,224,208)\n violet=(238,130,238)\n wheat=(245,222,179)\n white=(255,255,255)\n whitesmoke=(245,245,245)\n yellow=(255,255,0)\n yellowgreen=(154,205,50)\n", []], "cs1media.picture": [".py", "import browser\nimport json\nfrom .color import Color\n\ndef sanitize_color(color):\n if isinstance(color,str):\n  return list(getattr(Color,color))\n else :\n  return color\n  \nbrowser.self.sanitizeColor=sanitize_color\n\nbrowser.self.eval('''\nclass Picture {\n    constructor(width, height, data, color) {\n        this.width = width\n        this.height = height\n        this.title = ''\n        const buffer = new ArrayBuffer(width * height * 4);\n        this.data = new Uint8ClampedArray(buffer);\n        if (data) {\n            this.data.set(data, 0)\n        } else {\n            const safeColor = color ? self.sanitizeColor(color) : [0, 0, 0]\n            for (let i = 0; i < (width * height); i++) {\n                this.data.set(safeColor, i * 4)\n            }\n        }\n        for (let i = 0; i < (width * height); i++) {\n            this.data[(i * 4) + 3] = 255\n        }\n    }\n\n    show1() {\n        return this.show()\n    }\n\n    show() {\n        self.sendMsg('screen.cs1media.show', {\n            width: this.width,\n            height: this.height,\n            imageData: this.data\n        })\n    }\n\n    setPixels(color) {\n        const safeColor = color ? self.sanitizeColor(color) : [0, 0, 0]\n        for (let i = 0; i < (width * height); i++) {\n            this.data.set(safeColor, i * 4)\n        }\n    }\n\n    setTitle(title) {\n        this.title = title\n    }\n\n    title() {\n        return this.title\n    }\n\n    size() {\n        return [this.width, this.height]\n    }\n\n    getIndex(x, y) {\n        return (y * this.width * 4) + (x * 4)\n    }\n\n    get(x, y) {\n        const i = this.getIndex(x, y)\n        const subarray = this.data.subarray(i, i + 3)\n        return [subarray[0], subarray[1], subarray[2]]\n    }\n\n    set(x, y, color) {\n        const safeColor = self.sanitizeColor(color)\n        const i = this.getIndex(x, y)\n        this.data.set(safeColor, i)\n    }\n\n    greet() {\n        return 'hello'\n    }\n}\nself.Picture = Picture\n''')\n\nclass Picture(object):\n def __init__(self,width,height,data=None ,color=(0,0,0)):\n  self.obj=browser.self.Picture.new(width,height,data,list(color))\n  \n def size(self):\n  return self.obj.size()\n  \n def show1(self):\n  return self.obj.show1()\n  \n def show(self):\n  return self.obj.show()\n  \n def set_pixels(self,color=(0,0,0)):\n  return self.obj.setPixels(list(color))\n  \n def set_title(self,title):\n  return self.obj.setTitle()\n  \n def title(self):\n  return self.obj.title()\n  \n def get(self,x,y):\n  return tuple(self.obj.get(x,y))\n  \n def set(self,x,y,color):\n  if isinstance(color,str):\n   return self.obj.set(x,y,color)\n  else :\n   return self.obj.set(x,y,list(color))\n   \n def save_as(self,filename=None ):\n  raise NotImplementedError('cs1media in Pythonpad does not support save_as method.')\n", ["browser", "cs1media.color", "json"]], "cs1media": [".py", "import browser\nfrom .picture import Picture\n\n\ndef create_picture(width,height,color=(0,0,0)):\n global __media__\n try :\n  if ('locked_picture'in __media__)and ('lock_create'in __media__)and __media__['lock_create']:\n   return __media__['locked_picture']\n except NameError:\n  __media__={}\n  \n if width <0 or height <0:\n  raise ValueError('Invalid image dimensions: %s, %s'%(width,height))\n picture=Picture(width,height,color=color)\n \n if 'pictures'not in __media__:\n  __media__['pictures']=[picture]\n else :\n  __media__['pictures'].append(picture)\n  \n return picture\n \ndef load_picture(filename=None ):\n global __media__\n try :\n  if 'locked_picture'in __media__:\n   return __media__['locked_picture']\n except NameError:\n  __media__={}\n  \n if filename is None :\n  raise NotImplementedError('Pythonpad\\'s cs1media does not support dynamic image file loading.')\n if not browser.self.isFileExist(filename):\n  raise FileNotFoundError('No such file: \\'%s\\''%filename)\n file_dict=browser.self.getFileDict(filename)\n if 'imageData'not in file_dict:\n  raise ValueError('Pre-extracted image data is not found. Be aware that cs1media in Pythonpad only supports loading an image file that already existed in pad\\'s virtual file structure when the code is executed, only when cs1media is directly imported in main.py.')\n picture=Picture(\n file_dict['width'],file_dict['height'],data=file_dict['imageData'])\n \n if 'pictures'not in __media__:\n  __media__['pictures']=[picture]\n else :\n  __media__['pictures'].append(picture)\n  \n return picture\n \ndef lock_picture(picture,lock_create=False ):\n global __media__\n try :\n  __media__['locked_picture']=picture\n except NameError:\n  __media__={'locked_picture':picture}\n if lock_create:\n  __media__['lock_create']=True\n  \ndef unlock_picture():\n global __media__\n try :\n  del __media__['locked_picture']\n  del __media__['lock_create']\n except :\n  pass\n  \ndef get_all_pictures():\n try :\n  if 'pictures'in __media__:\n   return __media__['pictures']\n  else :\n   return []\n except NameError:\n  return []\n  \n  \n__all__=[\n'create_picture',\n'load_picture',\n'lock_picture',\n'unlock_picture',\n'get_all_pictures',\n]\n", ["browser", "cs1media.picture"], 1]}
__BRYTHON__.update_VFS(scripts)
