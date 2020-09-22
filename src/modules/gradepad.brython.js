__BRYTHON__.use_VFS = true;
var scripts = {"$timestamp": 1600777375067, "gradepad.phrases": [".py", "class Phrase(object):\n pass\n \n \ndef create_phrase_en():\n p=Phrase()\n p.grading='Grading'\n p.grading_failed='Failed to finish the grading. \\nPlease fix your code and try again!'\n p.grading_passed='Everything is in place! Well done!'\n p.try_again='Passed {pass_count}/{test_count} tests. Please try again!'\n p.error_occurred='An error has occurred in your code while grading. Failed to grade the code.'\n return p\n \ndef create_phrase_ko():\n p=Phrase()\n p.grading='\ucc44\uc810 \uc911'\n p.grading_failed='\ucc44\uc810\uc744 \uc644\ub8cc\ud558\uc9c0 \ubabb \ud588\uc2b5\ub2c8\ub2e4. \\n\ucf54\ub4dc\uc758 \uc5d0\ub7ec\ub97c \uace0\uce5c \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!'\n p.grading_passed='\ubaa8\ub4e0 \ud14c\uc2a4\ud2b8\ub97c \ud1b5\uacfc\ud588\uc2b5\ub2c8\ub2e4! \ud6cc\ub96d\ud574\uc694!'\n p.try_again='\ud14c\uc2a4\ud2b8 {test_count}\uac1c \uc911 {pass_count}\uac1c\ub97c \ud1b5\uacfc\ud588\uc2b5\ub2c8\ub2e4. \ucf54\ub4dc\ub97c \uc218\uc815\ud558\uace0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!'\n p.error_occurred='\ucc44\uc810 \uc911 \ucf54\ub4dc\uc5d0\uc11c \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \uc5d0\ub7ec\ub97c \uace0\uccd0\uc8fc\uc154\uc57c \ucc44\uc810\uc744 \ud560 \uc218 \uc788\uc5b4\uc694.'\n return p\n \ndef load_phrase(locale):\n if locale =='en':\n  return create_phrase_en()\n elif locale =='ko':\n  return create_phrase_ko()\n else :\n  return create_phrase_en()\n", []], "gradepad.grader": [".py", "import sys\nfrom .phrases import load_phrase\n\nclass Test:\n def __init__(self,grader,desc,fail_msg):\n  self.grader=grader\n  self.desc=desc\n  self.fail_msg=fail_msg\n  self.failed=False\n  \n def fail(self):\n  self.failed=True\n  \n def expect(self,value):\n  if not value:\n   self.fail()\n   \n def print_error(self,msg):\n  sys.stderr.write(str(msg)+'\\n')\n  \n def print_result(self,error=False ):\n  if self.failed:\n   self.print_error('- (X) %s'%self.desc)\n   if self.fail_msg:\n    self.print_error('** %s'%self.fail_msg)\n  else :\n   if error:\n    self.print_error('- (?) %s'%self.desc)\n   else :\n    print('- (O) %s'%self.desc)\n    \n    \nclass Grader:\n def __init__(self,pass_msg=None ,locale=None ):\n  self.pass_msg=pass_msg\n  self.failed=False\n  self.phrases=load_phrase(locale or 'en')\n  self.tests=[]\n  print('%s...'%self.phrases.grading)\n  \n def test(self,desc,fail_msg=None ):\n  test=Test(self,desc,fail_msg)\n  self.tests.append(test)\n  return test\n  \n def save_passed_state(self):\n  f=open('.passed.json','w')\n  f.close()\n  \n def print_error(self,msg):\n  sys.stderr.write(str(msg)+'\\n')\n  \n def done(self):\n  test_count=len(self.tests)\n  pass_count=len([1 for t in self.tests if not t.failed])\n  for test in self.tests:\n   test.print_result(error=self.failed)\n   \n  print()\n  if self.failed:\n   self.print_error(self.phrases.grading_failed)\n  elif test_count ==pass_count:\n   if self.pass_msg:\n    print(self.pass_msg)\n   else :\n    print(self.phrases.grading_passed)\n   self.save_passed_state()\n  else :\n   self.print_error(self.phrases.try_again.format(pass_count=pass_count,test_count=test_count))\n   \n def fail(self):\n  self.failed=True\n  \n def run(self,grade):\n  try :\n   grade(self)\n  except Exception as e:\n   self.print_error(self.phrases.error_occurred)\n   raise e\n  self.done()\n", ["gradepad.phrases", "sys"]], "gradepad": [".py", "from .stdout_collector import StdoutCollector\nfrom .grade_pipe import GradePipe\nfrom .grader import Grader\n\n__all__=[\n'StdoutCollector',\n'GradePipe',\n'Grader',\n]\n", ["gradepad.grade_pipe", "gradepad.grader", "gradepad.stdout_collector"], 1], "gradepad.stdout_collector": [".py", "import sys\n\n\nclass StdoutCollector:\n def __init__(self):\n  self.data_list=[]\n  \n def __enter__(self):\n  self.stdoutbak=sys.stdout\n  sys.stdout=self\n  return self\n  \n def __exit__(self,*args):\n  sys.stdout=self.stdoutbak\n  \n def write(self,data=''):\n  self.data_list.append(str(data))\n  \n def flush(self):\n  pass\n  \n def get_output(self):\n  return ''.join(self.data_list)\n", ["sys"]], "gradepad.grade_pipe": [".py", "import sys\nimport browser\n\nclass GradePipe:\n def __init__(self):\n  self.data_list=[]\n  self.input_data_list=[]\n  self.input_count=0\n  \n def __enter__(self):\n  self.stdoutbak=sys.stdout\n  sys.stdout=self\n  return self\n  \n def __exit__(self,*args):\n  sys.stdout=self.stdoutbak\n  if self.promptbak:\n   browser.self.prompt=self.promptbak\n   \n def write(self,data=''):\n  self.data_list.append(str(data))\n  \n def flush(self):\n  pass\n  \n def prompt(self,*args):\n  self.input_count +=1\n  if self.input_data_list:\n   return self.input_data_list.pop(0)+'\\n'\n  else :\n   return ''\n   \n def set_inputs(self,inputs):\n  self.promptbak=browser.self.prompt\n  browser.self.prompt=self.prompt\n  self.input_data_list=inputs\n  \n def get_output(self):\n  return ''.join(self.data_list)\n  \n def get_input_count(self):\n  return self.input_count\n", ["browser", "sys"]]}
__BRYTHON__.update_VFS(scripts)
