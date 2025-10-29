# my_ruaccent.py
from ruaccent import RUAccent as _RUAccent
from contextlib import contextmanager

#  
# Расширенный класс с возможностью отключения ёфиксации 
# (переопределение функции из ruaccent)   !!! 
class RUAccent(_RUAccent):
    def __init__(self, *args, disable_yo: bool = False, **kwargs):
        super().__init__(*args, **kwargs)
        self._disable_yo = bool(disable_yo)
 
    def disable_yo(self, state: bool = True):
        """Включить/выключить ё-фиксацию на лету."""
        self._disable_yo = bool(state)

    def _process_yo(self, words, sentence):
        # если выключено — не делаем замен; иначе передаём реализацию родителю
        if self._disable_yo:
            return words
        return super()._process_yo(words, sentence)

    @contextmanager
    def no_yo(self):
        """Контекстный менеджер: временно отключить ё внутри блока with."""
        prev = self._disable_yo
        self._disable_yo = True
        try:
            yield self
        finally:
            self._disable_yo = prev


# Опционально: функция для рантайм-монкипатча (применяй ДО того, как другой модуль 
# выполнит "from ruaccent import RUAccent")     !!!!   
def apply_monkeypatch():
    import ruaccent as _ra
    _ra.RUAccent = RUAccent
