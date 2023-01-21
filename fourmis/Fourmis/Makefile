SOUS_REPERTOIRES = src

all : sous_repertoires
.PHONY : all doc sous_repertoires $(SOUS_REPERTOIRES) clean

doc :
	rm -fr doc
	doxygen .doxyfile 1>| .doxy.sor 2>&1

sous_repertoires : $(SOUS_REPERTOIRES)

$(SOUS_REPERTOIRES):
	$(MAKE) -k -C $@ all

clean :
	for rep in $(SOUS_REPERTOIRES); do \
	  $(MAKE) -k -C $$rep clean; \
	done

